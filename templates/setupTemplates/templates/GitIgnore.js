const RunnerTemplate = require('../RunnerTemplate');

class GitIgnore extends RunnerTemplate {
  setupFiles() {
    return this.runner.copy(
      this.tmplPath('.gitignore'),
      this.destPath('.gitignore'),
    );
  }
}

module.exports = GitIgnore;
