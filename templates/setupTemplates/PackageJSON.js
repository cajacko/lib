const { RunnerTemplate } = require('@cajacko/template');
const merge = require('lodash/merge');
const { readJSON, pathExists } = require('fs-extra');

const projectJSON = {
  name: 'weewee',
  version: '0.1.0',
  description: 'Example project',
  license: 'MIT',
  scripts: {
    start: 'lib start',
    test: 'lib test',
    build: 'lib build',
    deploy: 'lib deploy',
    postinstall: 'lib postinstall',
    precommit: 'lib precommit',
  },
};

class PackageJSON extends RunnerTemplate {
  constructor(...args) {
    super(...args);

    this.packageJSON = {};
  }

  preRun() {
    const path = this.getDestPath('package.json');

    return pathExists(path)
      .then((exists) => {
        if (!exists) return projectJSON;

        return readJSON(path).then(json => merge(projectJSON, json));
      })
      .then((json) => {
        this.packageJSON = json;
      });
  }

  setupFiles() {
    this.packageJSON = projectJSON;
  }

  postSetupFiles() {
    this.packageJSON.name = this.runner.projectConfig.slug;
    this.packageJSON.description = this.runner.projectConfig.description;
    this.packageJSON.license = this.runner.projectConfig.license;

    return this.runner.writeJSON(this.packageJSON, 'package.json');
  }
}

module.exports = PackageJSON;
