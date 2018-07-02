const Utils = require('./Utils');

class Dependencies extends Utils {
  constructor() {
    super();

    this.nodeModules = {};
  }

  addNodeModules(nodeModules) {
    this.nodeModules = { ...nodeModules, ...this.nodeModules };
  }
}

module.exports = Dependencies;
