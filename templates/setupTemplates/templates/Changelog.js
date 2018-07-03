const RunnerTemplate = require('../RunnerTemplate');

class Changelog extends RunnerTemplate {
  setupFiles() {
    return this.runner.copyIfDoesNotExist(
      this.tmplPath('CHANGELOG.md'),
      'CHANGELOG.md',
    );
  }
}

module.exports = Changelog;
