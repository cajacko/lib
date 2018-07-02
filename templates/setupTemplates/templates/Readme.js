const RunnerTemplate = require('../RunnerTemplate');

class Readme extends RunnerTemplate {
  setupFiles() {
    return this.runner.copyTmpl(
      this.tmplPath('readme/header.md'),
      this.destPath('README.md'),
      this.config,
    );
  }
}

module.exports = Readme;
