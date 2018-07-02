const Queue = require('promise-queue');
const { join } = require('path');
const projectDir = require('../utils/project/projectDir');

class Utils {
  constructor() {
    this.projectDir = null;

    this.utilsSetup = this.getProjectDir();
  }

  getProjectDir() {
    return projectDir.get().then((dir) => {
      this.projectDir = dir;
    });
  }

  newQueue() {
    return new Queue(1, Infinity);
  }

  tmplPath(path) {
    return join(__dirname, 'templates/files', path);
  }

  destPath(path) {
    return join(this.projectDir, path);
  }
}

module.exports = Utils;
