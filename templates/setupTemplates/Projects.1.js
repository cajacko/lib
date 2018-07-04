const { getIsGitRepo, setupNewRepo } = require('../../utils/git/git');
const {
  getProjectConfig,
  // getMissingConfigKeys,
  // askAndSetProjectConfig,
  // askForOutstandingProjectConfigAndSet,
} = require('../../utils/project/projectConfig');
// const deleteExistingFiles = require('../../utils/fs/deleteAllFiles');
// const setProjectFiles = require('../../utils/project/setProjectFiles');
// const add = require('../../utils/config/add');
// const setTemplateFiles = require('../../utils/setTemplateFiles');
const packageJSON = require('../../../package.json');
const { RunnerTemplate } = require('@cajacko/template');
const WebTemplate = require('./Website');

class Projects extends RunnerTemplate {
  init() {
    this.runner.add('setupFiles', [
      () => this.getExistingConfig(),
      // this.createProjectOrReuse,
      () => this.ensureGitRepo(),
      // this.getShouldUpdate,
      // this.goThroughProjectConfig,
      () => this.setNewRanWithProjectVersion(),
      () => this.writeProjectConfig(),
    ]);
  }

  writeProjectConfig() {
    this.runner.writeJSON(this.runner.projectConfig, 'project.json');
  }

  setNewRanWithProjectVersion() {
    const projectConfig = Object.assign({}, this.runner.projectConfig);
    projectConfig.lastRanWithProjectVersion = packageJSON.version;
    this.runner.setProp('projectConfig', projectConfig);
  }

  ensureGitRepo() {
    return getIsGitRepo().then((isGitRepo) => {
      if (!isGitRepo) {
        console.log("Looks like you are not in a git repo, let's set one up. \nIf you want to run this for an existing project, cd into the project then run this command");
        return setupNewRepo();
      }

      return Promise.resolve();
    });
  }

  getShouldDeleteExistingFiles() {
    return this.runner
      .prompt([
        {
          type: 'confirm',
          name: 'shouldDelete',
          message: 'Do you want to delete all current files in this repo?',
        },
      ])
      .then(({ shouldDelete }) => shouldDelete);
  }

  getExistingConfig() {
    return getProjectConfig().then((projectConfig) => {
      if (projectConfig) {
        this.runner.setProp('projectConfig', projectConfig);
      }
    });
  }

  goThroughProjectConfig() {
    // Go through all the project qs
    if (!this.runner.projectConfig.projects) return Promise.resolve();

    const queue = [];

    this.runner.projectConfig.projects.forEach((projectConfig) => {
      queue.push(() =>
        this.setupProject(projectConfig.template, projectConfig));
    });

    return this.promiseQueue(queue);
  }

  setupProject(template, templateConfig) {
    switch (template) {
      case 'Website':
        return new WebTemplate(this.runner, templateConfig);
      default:
        return Promise.resolve();
    }
  }
}

module.exports = Projects;
