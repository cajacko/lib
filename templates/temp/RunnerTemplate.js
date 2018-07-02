const Utils = require('./Utils');

class RunnerTemplate extends Utils {
  constructor(runner) {
    super();

    this.runner = runner;

    if (this.init) this.init();
  }
}

module.exports = RunnerTemplate;
