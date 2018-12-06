// @flow
/* eslint max-lines: 0 */

import { join } from 'path';
import { tmpdir } from 'os';
import {
  copy,
  readJSON,
  writeJSON,
  writeFile,
  remove,
  readFile,
  pathExists,
} from 'fs-extra';
import * as git from '../git';
import GitHub from './GitHub';

/**
 * Manage certificates in a private github repo
 */
class CertStorage {
  /**
   * Initialise the class, set the initial props and bind methods
   */
  constructor(key: string, gitPath: string, subKey, opts) {
    this.opts = opts || {};
    this.key = key;
    this.gitPath = gitPath;
    this.subKey = subKey;
    this.subs = {};
    this.certs = {};
    this.gitDir = join(tmpdir(), '@cajacko/template/CertStorage', key);
    this.certValuesPath = join(this.gitDir, 'values.json');
    this.github = this.opts.githubRepo && new GitHub(this.opts.githubToken);

    this.git = {
      commit: message => git.commit(this.gitDir, message, true),
      pull: () =>
        git
          .doesBranchExist(this.gitDir, 'master')
          .then(branchExists => branchExists && git.pull(this.gitDir)),
      push: () => git.push(this.gitDir),
    };

    this.commit = this.commit.bind(this);
  }

  /**
   * Register a sub cert storage instance
   */
  registerSub(key) {
    this.subs[key] = new CertStorage(this.key, this.gitPath, key, this.opts);

    return this.subs[key];
  }

  /**
   * Add some certificates to commit later
   */
  add(...certs) {
    certs.forEach(({ key, ...cert }) => {
      this.certs[key] = { key, ...cert };
    });

    return Promise.resolve();
  }

  /**
   * Get the certificates
   */
  get(getKey, preventDelete) {
    return this.ensureRepo()
      .then(() => this.git.pull())
      .then(() => readJSON(this.certValuesPath))
      .then((data) => {
        const finalData = {};

        const promises = [];

        Object.keys(data).forEach((key) => {
          const { value, path } = data[key];

          if (path) {
            promises.push(readFile(join(this.gitDir, path)).then(contents => ({
              key,
              value: contents,
            })));
          } else {
            finalData[key] = value;
          }
        });

        return Promise.all(promises).then((certs) => {
          certs.forEach(({ key, value }) => {
            finalData[key] = value;
          });

          return finalData;
        });
      })
      .then(data => this.deleteLocalRepo(preventDelete).then(() => data))
      .then((data) => {
        if (getKey) return data[getKey];

        return data;
      });
  }

  /**
   * Commit the new certificates and push to github
   */
  commit({ preventDelete, init, preventEnsure } = {}) {
    const subKeys = Object.keys(this.subs);

    /**
     * Loop through each sub CertStorage instance
     */
    const loop = (i = 0) => {
      const subKey = subKeys[i];

      if (!subKey) return Promise.resolve();

      return this.subs[subKey]
        .commit({ preventDelete, init })
        .then(() => loop(i + 1));
    };

    // Sometimes we call commit from within ensure, so this makes sure we
    // don't infinitely loop
    const promise = preventEnsure ? Promise.resolve() : this.ensureRepo();

    return loop().then(() =>
      promise
        .then(() => this.git.pull())
        .then(() => this.copyCerts(init))
        .then(() =>
          this.git.commit(init ? 'Initialised repo' : 'Updated certs'))
        .then(() => this.git.push())
        .then(() => this.deleteLocalRepo(preventDelete || init)));
  }

  /**
   * Ensure the github repo exists, relies on the name to be specfied in opts
   * as githubRepo
   */
  ensureGitHubRepo() {
    const { githubRepo, githubUser } = this.opts;

    if (!githubRepo) {
      throw new Error('opts.githubRepo does not exist in CertStorage');
    }

    return this.github
      .repoExists(githubRepo, githubUser, { mustBePrivate: true })
      .then((doesExist) => {
        if (doesExist) return Promise.resolve({});

        return this.github
          .createRepo(githubRepo, { private: true })
          .then(() => ({ initNewRepo: true }));
      });
  }

  /**
   * Ensure the Github repo
   */
  ensureRepo() {
    return git.isGitRepo(this.gitDir).catch(() =>
      // There may be some legacy dir here, if something went wrong, this would
      // cause the clone to fail if we leave it
      remove(this.gitDir).then(() => {
        const promise = this.github
          ? this.ensureGitHubRepo()
          : Promise.resolve({});

        return promise.then(({ initNewRepo }) =>
          git
            .clone(this.gitPath, this.gitDir)
            .catch(() => {
              throw new Error(`Could not clone repo at:\n${
                this.gitPath
              }\nEnsure you have created a PRIVATE repo there`);
            })
            .then(() => {
              if (initNewRepo) {
                return this.commit({ init: true, preventEnsure: true });
              }

              // This file always exists if we've setup the repo previously. So
              // use it to judge if we should do an initial commit
              return pathExists(this.certValuesPath).then((exists) => {
                if (exists) return Promise.resolve();

                return this.commit({
                  init: true,
                  preventEnsure: true,
                });
              });
            }));
      }));
  }

  /**
   * Copy the certificates stored in this instance, into the local repository
   */
  copyCerts(init) {
    const promises = [];
    const newVals = {};

    // Don't want to add anything on the initial commit
    if (!init) {
      Object.values(this.certs).forEach(({
        key, title, value, filePath,
      }) => {
        if (filePath) {
          promises.push(copy(filePath, this.getCertFile(key)));

          newVals[key] = {
            title,
            path: `certs/${key}.txt`,
          };
        } else {
          newVals[key] = {
            title,
            value,
          };
        }
      });
    }

    promises.push(readJSON(this.certValuesPath)
      .catch(() => null)
      .then((values) => {
        const finalVals = Object.assign({}, values || {}, newVals);

        let readme = `# Certificates and secrets for ${this.key}\n\n`;

        // Don't want to add any actual content in initial commit
        if (!init) {
          Object.keys(finalVals).forEach((key) => {
            const { title, value, path } = finalVals[key];

            if (title) {
              readme = `${readme}## ${title}\n`;
            }

            readme = `${readme}key: \`${key}\`\n\n`;

            if (path) {
              readme = `${readme}path: \`${path}\`\n`;
            } else {
              readme = `${readme}value:\n\`\`\`\n${value}\n\`\`\``;
            }

            readme = `${readme}\n---\n`;
          });
        }

        return Promise.all([
          writeJSON(this.certValuesPath, finalVals, { spaces: 2 }),
          writeFile(join(this.gitDir, 'README.md'), readme),
          writeFile(join(this.gitDir, '.gitignore'), '.DS_Store'),
        ]);
      }));

    return Promise.all(promises);
  }

  /**
   * Delete the local repo, so no files persist on the system
   */
  deleteLocalRepo(preventDelete) {
    if (preventDelete === true) return Promise.resolve();

    if (preventDelete !== false && this.opts.preventDelete) {
      return Promise.resolve();
    }

    return remove(this.gitDir);
  }

  /**
   * Get a specific certificate file path
   */
  getCertFile(key) {
    return join(this.gitDir, 'certs', `${key}.txt`);
  }
}

export default CertStorage;
