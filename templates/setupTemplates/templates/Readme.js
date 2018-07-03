const RunnerTemplate = require('../RunnerTemplate');

class Readme extends RunnerTemplate {
  setupFiles() {
    return this.runner.copyTmpl(
      this.tmplPath('readme/header.md'),
      'README.md',
      this.projectConfig,
    );
  }
}

module.exports = Readme;
