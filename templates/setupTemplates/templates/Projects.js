const RunnerTemplate = require('../RunnerTemplate');
const WebTemplate = require('./Website');

class Projects extends RunnerTemplate {
  init() {
    this.runner.add('setupFiles', [
      this.createProjectOrReuse,
      this.ensureGitRepo,
      this.getExistingConfig,
      this.goThroughProjectConfig,
      this.newProjectConfig,
      this.setNewRanWithProjectVersion,
    ]);
  }

  goThroughProjectConfig() {
    return () => {
      if (!this.runner.projectConfig.projects) return Promise.resolve();

      const queue = [];

      this.runner.projectConfig.projects.forEach((projectConfig) => {
        queue.push(() =>
          this.setupProject(projectConfig.template, projectConfig));
      });

      return this.promiseQueue(queue);
    };
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
