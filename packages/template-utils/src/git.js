// @flow

import simpleGit from 'simple-git/promise';
import getIsGit from 'is-git-repository';
import { ensureDir, exists } from 'fs-extra';

/**
 * Figure out if there is a git repo at the given directory
 *
 * @param {String} dir The directory to check
 * @param {Object} opts Additional options to pass to the func
 *
 * @return {Promise} Resolves if the dir is a git repo
 */
export const isGitRepo = (dir, opts) =>
  exists(dir).then((doesExist) => {
    const { throwOnFalse } = opts || { throwOnFalse: true };

    let error = null;

    if (doesExist) {
      const isGit = getIsGit(dir);

      if (!isGit) {
        error = `Supplied directory is not a git repo: ${dir}`;
      }
    } else {
      error = `Dir does not exist: ${dir}`;
    }

    if (throwOnFalse) throw new Error(error);

    return !error;
  });

export const getLastVersionTag = dir =>
  simpleGit(dir)
    .tags()
    .then((tags) => {
      const lastVersionTag = tags.all
        .reverse()
        .find(tag => !!tag.match(/v[0-9]+\.[0-9]+\.[0-9]+/));

      if (!lastVersionTag) {
        throw new Error(`Could not find the latest version tag in ${dir}`);
      }

      return lastVersionTag;
    });

export const getAllCommitsSinceTag = (dir, tag) =>
  simpleGit(dir)
    .log({
      from: tag,
      to: 'HEAD',
    })
    .then(logs => logs.all);

export const stageAll = dir => simpleGit(dir).add('-A');

export const commit = (dir, message, addAll = true, noVerify) => {
  const g = simpleGit(dir);

  const options = {};

  if (noVerify) {
    options['--no-verify'] = true;
  }

  if (addAll) return stageAll(dir).then(() => g.commit(message, options));

  return g.commit(message, options);
};

export const push = (dir, remote = 'origin') => {
  const g = simpleGit(dir);

  return g.push(remote).then(() => g.pushTags(remote));
};

export const tag = (dir, tagName, message) =>
  simpleGit(dir).addAnnotatedTag(tagName, message);

export const hasUncommitedChanges = dir =>
  simpleGit(dir)
    .status()
    .then(({ files }) => !!files.length);

export const hasStagedChanges = dir =>
  simpleGit(dir)
    .status()
    .then(({ staged, files }) =>
      staged.length !== 0 ||
        // eslint-disable-next-line camelcase
        files.some(({ working_dir }) => working_dir.trim() === ''));

export const getOrigin = dir =>
  simpleGit(dir)
    .listRemote(['--get-url'])
    .then(data => data.trim());

export const getRootDir = dir =>
  simpleGit(dir)
    .revparse(['--show-toplevel'])
    .then(data => data.trim());

export const getCurrentBranch = dir =>
  simpleGit(dir)
    .branch()
    .then(({ current }) => current);

export const hasUnstagedChanges = dir =>
  simpleGit(dir)
    .status()
    .then(({ files }) =>
    // eslint-disable-next-line camelcase
      files.filter(({ working_dir }) => working_dir.trim() !== '').length !==
        0);

export const clone = (origin, dir) =>
  ensureDir(dir).then(() => simpleGit().clone(origin, dir));

export const pull = dir => simpleGit(dir).pull();

export const doesBranchExist = (dir, branch) =>
  simpleGit(dir)
    .branch()
    .then(({ all }) => all.includes(branch));
