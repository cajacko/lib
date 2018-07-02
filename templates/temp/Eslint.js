const RunnerTemplate = require('./RunnerTemplate');

class Eslint extends RunnerTemplate {
  init() {
    this.runner.add('postSetupFiles', this.setupEslint);
  }

  setupEslint() {
    // Get all the eslint config, which people can define through this.runner.eslint.add(...) Or something like this
  }
}

module.exports = Eslint;
