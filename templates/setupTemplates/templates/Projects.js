const { join } = require('path');
const { ensurePath } = require('fs-extra');
const RunnerTemplate = require('../RunnerTemplate');
const projectDir = require('../../utils/project/projectDir');
const { getProjectConfig } = require('../../utils/project/projectConfig');
const { getIsGitRepo } = require('../../utils/git/git');

class Projects extends RunnerTemplate {
  init() {
    this.runner.add('setupFiles', [
      () => this.getExistingConfig(),
      () => this.createProjectOrUseDir(),
      // () => this.getExistingConfig(),
      // () => this.ensureGitRepo(),
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

          return this.runner.prompt({
            type: 'input',
            message: `Enter a relative folder name/path for your project, or leave blank to run here: ${dir}`,
            default: null,
            validate: () => {},
          });
        })
        .then((relativePath) => {
          if (relativePath) {
            const absolutePath = join(dir, relativePath);
            return ensurePath(absolutePath).then(projectDir.set(absolutePath));
          }

          return Promise.resolve();
        }));
  }
}

module.exports = Projects;
