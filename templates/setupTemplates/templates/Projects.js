const { join } = require('path');
const { ensureDir } = require('fs-extra');
const RunnerTemplate = require('../RunnerTemplate');
const projectDir = require('../../utils/project/projectDir');
const { getProjectConfig } = require('../../utils/project/projectConfig');
const { getIsGitRepo } = require('../../utils/git/git');

class Projects extends RunnerTemplate {
  init() {
    this.runner.add('preRun', [
      () => this.getExistingConfig(),
      () => this.createProjectOrUseDir(),
      () => this.getExistingConfig(),
      () => this.ensureGitRepo(),
      // () => this.getShouldSetMissingConfigOnly(),
      // () => this.goThroughGenericProjectConfig(),
      // () => this.goThroughExistingTemplatesConfig(),
      // () => this.askAndSetNewTemplateConfig(),
      // () => this.setNewRanWithProjectVersion(),
      // () => this.writeProjectConfig(),
    ]);
  }

  getExistingConfig() {
    return getProjectConfig().then((projectConfig) => {
      if (projectConfig) {
        this.runner.setProp('projectConfig', projectConfig);
      }
    });
  }

  createProjectOrUseDir() {
    if (this.runner.projectConfig) return Promise.resolve();

    return projectDir.get().then(dir =>
      getIsGitRepo(dir)
        .then((isGitRepo) => {
          if (isGitRepo) return Promise.resolve();

          return Promise.reject(new Error('Need to define the code here'));

          // return this.runner.prompt({
          //   type: 'input',
          //   message: `Enter a relative folder name/path for your project, or leave blank to run here:\n${dir}\n`,
          //   default: null,
          //   // validate: () => {},
          // });
        })
        .then((relativePath) => {
          if (relativePath) {
            const absolutePath = join(dir, relativePath);
            return ensureDir(absolutePath).then(projectDir.set(absolutePath));
          }

          return Promise.resolve();
        }));
  }

  ensureGitRepo() {
    return projectDir.get().then(dir =>
      getIsGitRepo(dir).then((isGitRepo) => {
        if (isGitRepo) return Promise.resolve();

        return Promise.reject(new Error('Need to implement this step'));

        // console.log("Looks like you are not in a git repo, let's set one up. \nIf you want to run this for an existing project, cd into the project then run this command");

        // // TODO: init git repo now
        // return setupNewRepo(dir).then(() =>
        //   this.runner
        //     .prompt({
        //       type: 'confirm',
        //       name: 'shouldAddToGitHub',
        //       message: 'Do you want to add this as a new repo to GitHub?',
        //     })
        //     .then((shouldAddToGithub) => {
        //       if (!shouldAddToGithub) return Promise.resolve();

        //       return this.runner
        //         .prompt({
        //           type: 'input',
        //           name: 'name',
        //           message: 'Name for the new repo',
        //           validate: (name) => {
        //             if (!isSlug(name)) {
        //               return 'The repo name must be in a url slug like format e.g. repo-name';
        //             }

        //             return true;
        //           },
        //           default: () => {
        //             const parts = dir.split('/');
        //             return parts[parts.length - 1];
        //           },
        //         })
        //         .then(githubName => addToGithub(dir, githubName));
        //     }));
      }));
  }
}

module.exports = Projects;
