// @flow

import { git, runCommand, getProjectDir, ask } from '@cajacko/template-utils';
import { readJSON, writeJSON, readdir, lstat } from 'fs-extra';
import { join } from 'path';

/**
 * Figure out if a path is a directory or not
 *
 * @param {String} dir The path to check
 *
 * @return {Promise} Resolves with whether the path is a dir
 */
const getIsDir = dir => lstat(dir).then(stats => stats && stats.isDirectory());

/**
 * Get all the packages in the monorepo
 *
 * @return {Promise} Resolves with an array of paths to each package
 */
const getAllPackageDirs = () => {
  const packagesDir = join(__dirname, '../../../');

  return readdir(packagesDir).then((files) => {
    const promises = [];
    const dirs = [];

    files.forEach((file) => {
      const dir = join(packagesDir, file);

      promises.push(getIsDir(dir).then((isDir) => {
        if (isDir) {
          dirs.push(dir);
        }
      }));
    });

    return Promise.all(promises).then(() => dirs);
  });
};

/**
 * Get all the public monorepo package.json files
 *
 * @return {Promise} Resolves with an array of each package.json files
 */
const getPackages = () =>
  getAllPackageDirs().then((dirs) => {
    const promises = [];

    const packages = [];

    dirs.forEach((dir) => {
      promises.push(readJSON(join(dir, 'package.json')).then((packageJSON) => {
        if (packageJSON.private) return;

        packages.push(packageJSON);
      }));
    });

    return Promise.all(promises).then(() => packages);
  });

/**
 * Throw an error if 1 item in an array is not true
 *
 * @param {Array} errorMessages An array of error messages, mapped to
 * each condition
 * @param {Object} [options] Options
 *
 * @return {Function} Func that gets passed in an array of conditions
 */
const checkAllConditions = (
  errorMessages = [],
  { inverse } = {}
) => (conditions) => {
  conditions.forEach((condition, i) => {
    if ((inverse && condition) || (!inverse && !condition)) {
      throw new Error(errorMessages[i] || 'checkAllConditions encountered a false condition');
    }
  });
};

/**
 * Publish changes to the template packages, and use the new
 * version in the current project
 *
 * @return {Promise} Resolves when finished
 */
const upgrade = () => {
  const templateDir = join(__dirname, '../../../../');

  return getProjectDir().then((projectDir) => {
    const projectPackageJSONPath = join(projectDir, 'package.json');

    return Promise.all([
      git.isGitRepo(projectDir, { throwOnFalse: false }),
      git.isGitRepo(templateDir, { throwOnFalse: false }),
    ])
      .then(checkAllConditions([
        'Project dir is not a git repo',
        'Template dir is not a git repo, ensure you have USE_LOCAL_LIBS set to true',
      ]))
      .then(() =>
        Promise.all([
          git.hasUncommitedChanges(projectDir),
          git.hasUncommitedChanges(templateDir),
        ]))
      .then(checkAllConditions(
        [
          'The project repo has uncommited changes, please commit or stash these to continue',
          'The template repo has uncommited changes, please commit or stash these to continue',
        ],
        { inverse: true }
      ))
      .then(() =>
        ask({
          message:
            'What kind of version bump do you want to apply to the libs?',
          type: 'list',
          choices: ['major', 'minor', 'patch'],
        }))
      .then(release =>
        runCommand(`npx lerna publish ${release} --yes`, templateDir))
      .then(() =>
        Promise.all([getPackages(), readJSON(projectPackageJSONPath)])
          .then(([packages, packageJSON]) => {
            const newPackageJSON = Object.assign({}, packageJSON);

            /**
             * Go through all the packages and update any that have changed
             *
             * @param {String} type The type of dependency
             *
             * @return {Void} No return value
             */
            const processPackages = (type) => {
              const dependencies = newPackageJSON[type];

              if (!dependencies) return;

              packages.forEach(({ name, version }) => {
                if (dependencies[name]) {
                  newPackageJSON[type][name] = version;
                }
              });
            };

            [
              'dependencies',
              'devDependencies',
              'peerDependencies',
              'optionalDependencies',
            ].forEach(processPackages);

            return writeJSON(projectPackageJSONPath, newPackageJSON, {
              spaces: 2,
            });
          })
          .then(() => runCommand('yarn install', projectDir))
          .then(() => git.hasUncommitedChanges(projectDir))
          .then(() =>
            git.commit(projectDir, 'Updated @cajacko/~ packages', true, true)))
      .then(() =>
        ask({
          type: 'confirm',
          message:
            'You must run "yarn run init" now, in case something has updated',
        }));
  });
};

export default upgrade;
