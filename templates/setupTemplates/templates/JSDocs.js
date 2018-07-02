const RunnerTemplate = require('../RunnerTemplate');

class JSDocs extends RunnerTemplate {
  setupFiles() {
    this.runner.copy(this.tmplPath('jsdoc.json'), this.destPath('jsdoc.json'));

    this.runner.addNodeModules({
      jsdoc: { type: 'dev', version: '3.5.5' },
    });
  }
}

module.exports = JSDocs;
