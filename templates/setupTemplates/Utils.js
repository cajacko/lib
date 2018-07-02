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

  promiseQueue(promises) {
    let i = 0;

    const runAllPromises = () => {
      if (!promises[i]) return Promise.resolve();

      return promises[i]().then(() => {
        i += 1;
        return runAllPromises();
      });
    };

    return runAllPromises();
  }

  tmplPath(path) {
    return join(__dirname, 'templates/files', path);
  }

  destPath(path) {
    return join(this.projectDir, path);
  }
}

module.exports = Utils;
