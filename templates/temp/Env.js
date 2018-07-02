const RunnerTemplate = require('./RunnerTemplate');

class Env extends RunnerTemplate {
  init() {
    this.runner.add('postSetupFiles', this.setupEnv);
  }

  setupEnv() {
    // Get all the env config, which people can define through this.runner.env.add(...) Or something like this
  }
}

module.exports = Env;
