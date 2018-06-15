const { writeJSON } = require('fs-extra');
const { join } = require('path');
const merge = require('lodash/merge');
const projectDir = require('../projectDir');

const getPackageJSONPath = () =>
  projectDir.get().then(dir => join(dir, 'package.json'));

const getPackageJSONFromConfig = (config) => {
  const { githubRepo } = config;

  const packageJSON = {
    version: config.version,
    name: config.projectName,
    description: config.description,
    license: config.license,
    private: config.private,
    author: {
      name: config.authorName,
      email: config.authorEmail,
      url: config.authorUrl,
    },
  };

  if (githubRepo) {
    merge(packageJSON, {
      homepage: `${githubRepo}#readme`,
      bugs: {
        url: `${githubRepo}/issues`,
      },
      repository: {
        type: 'git',
        url: `${githubRepo}.git`,
      },
    });
  }

  return packageJSON;
};

exports.set = (config) => {
  const contents = getPackageJSONFromConfig(config);

  return getPackageJSONPath().then(path =>
    writeJSON(path, contents, { spaces: 2 }));
};
