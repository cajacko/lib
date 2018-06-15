const { writeJSON } = require('fs-extra');
const { join } = require('path');
const merge = require('lodash/merge');
const projectDir = require('../project/projectDir');

const getPackageJSONPath = () =>
  projectDir.get().then(dir => join(dir, 'package.json'));

const getPackageJSONFromConfig = (config) => {
  const { githubRepo, keywords } = config;

  const packageJSON = {
    version: config.version,
    name: config.projectName,
    description: config.description,
    license: config.noLicense ? 'NO_LICENSE' : 'MIT',
    private: !config.publicOnNPM,
    author: {
      name: config.authorName,
      email: config.authorEmail,
      url: config.authorUrl,
    },
    bugs: {
      email: config.bugEmail || config.authorEmail,
    },
    scripts: {
      start: 'lib start',
      run: 'lib run',
      test: 'lib test',
      link: 'lib link',
      unlink: 'lib unlink',
      build: 'lib build',
      deploy: 'lib deploy',
      'pre-commit': 'lib precommit',
      'pre-push': 'lib prepush',
      'commit-msg': 'lib commitmsg',
    },
  };

  if (keywords && keywords.length) {
    packageJSON.keywords = keywords;
  }

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
