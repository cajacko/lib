const RunnerTemplate = require('../RunnerTemplate');

class GitAttributes extends RunnerTemplate {
  setupFiles() {
    return this.runner.copy(
      this.tmplPath('.gitattributes'),
      this.destPath('.gitattributes'),
    );
  }
}

module.exports = GitAttributes;
