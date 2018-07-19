const { RunnerTemplate } = require('@cajacko/template');

class Readme extends RunnerTemplate {
  setupFiles() {
    return this.runner.copyTmpl(
      this.getTmplPath('readme/header.md'),
      'README.md',
      this.projectConfig,
    );
  }
}

module.exports = Readme;