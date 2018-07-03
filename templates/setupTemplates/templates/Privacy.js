const RunnerTemplate = require('../RunnerTemplate');

class Privacy extends RunnerTemplate {
  setupFiles() {
    return this.runner.copyTmpl(
      this.tmplPath('PRIVACY.md'),
      'PRIVACY.md',
      this.projectConfig,
    );
  }
}

module.exports = Privacy;
