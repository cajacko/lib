const RunnerTemplate = require('../RunnerTemplate');

class Privacy extends RunnerTemplate {
  setupFiles() {
    return this.runner.copyTmpl(
      this.tmplPath('PRIVACY.md'),
      this.destPath('PRIVACY.md'),
      this.config,
    );
  }
}

module.exports = Privacy;
