const { join } = require('path');
const projectDir = require('../utils/project/projectDir');

class Utils {
  promiseQueue(promises, throttle = 1) {
    let i = 0;

    const runAllPromises = () => {
      if (!promises[i]) return Promise.resolve();

      return Promise.resolve(promises[i]()).then(() => {
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
    return projectDir.get().then(dir => join(dir, path));
  }
}

module.exports = Utils;
