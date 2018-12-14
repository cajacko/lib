// @flow

import { join } from 'path';
import { readJSON, writeJSON } from 'fs-extra';

/**
 * Ensure the path we're given will be a package.json path
 */
const ensurePackageJSONPath = (path) => {
  if (path.includes('package.json')) return path;

  return join(path, 'package.json');
};

/**
 * Copy dependencies from a project.json dir to another one
 */
const copyDependencies = (src, dest, { ignore, whitelist } = {}) => {
  const srcPath = ensurePackageJSONPath(src);
  const destPath = ensurePackageJSONPath(dest);

  return Promise.all([readJSON(srcPath), readJSON(destPath)]).then(([srcContents, destContents]) => {
    const newDestContents = Object.assign({}, destContents);

    if (srcContents.dependencies) {
      Object.keys(srcContents.dependencies).forEach((packageName) => {
        if (whitelist) {
          if (!whitelist.includes(packageName)) return;
        } else if (ignore && ignore.includes(packageName)) {
          return;
        }

        const version = srcContents.dependencies[packageName];

        if (!newDestContents.dependencies) newDestContents.dependencies = {};

        newDestContents.dependencies[packageName] = version;
      });
    }

    return writeJSON(destPath, newDestContents, { spaces: 2 });
  });
};

export default copyDependencies;
