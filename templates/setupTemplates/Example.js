const { RunnerTemplate } = require('@cajacko/template');

class Example extends RunnerTemplate {
  setupFiles() {
    return Promise.all([
      this.runner.copyIfDoesNotExist(
        this.getTmplPath('example/entry.js'),
        'src/entry.js',
      ),
      this.runner.copy(
        this.getTmplPath('example/package.json'),
        'package.json',
      ),
      this.runner.copy(
        this.getTmplPath('example/project.json'),
        'project.json',
      ),
    ]);
  }
}

module.exports = Example;
