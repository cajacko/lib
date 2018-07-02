const ejs = require('ejs');
const {
  copy,
  ensureFile,
  pathExists,
  readFile,
  writeFile,
  writeJSON,
} = require('fs-extra');
const Dependencies = require('./Dependencies');

class FileManagement extends Dependencies {
  constructor() {
    super();

    this.filesToWrite = {};
  }

  writeFiles() {
    const promises = [];

    Object.keys(this.filesToWrite).forEach((dest) => {
      const {
        onlyIfDoesNotExist, path, variables, json,
      } = this.filesToWrite[
        dest
      ];

      const promise = () =>
        this.conditionallyCheckIfExists(dest, onlyIfDoesNotExist, () =>
          ensureFile(dest).then(() => {
            if (json) {
              return writeJSON(dest, json, { spaces: 2 });
            }

            if (variables) {
              return readFile(path).then((contents) => {
                const template = ejs.compile(contents.toString());

                const finalContents = template(variables);

                return writeFile(dest, finalContents);
              });
            }

            return copy(path, dest);
          }));

      promises.push(promise);
    });

    return this.promiseQueue(promises, 10);
  }

  conditionallyCheckIfExists(dest, onlyIfDoesNotExist, cb) {
    if (onlyIfDoesNotExist) {
      return pathExists(dest).then((exists) => {
        if (exists) return Promise.resolve();

        return cb();
      });
    }

    return cb();
  }

  copyIfDoesNotExist(src, dest) {
    this.filesToWrite[dest] = {
      onlyIfDoesNotExist: true,
      path: src,
    };
  }

  copyTmpl(src, dest, options) {
    this.filesToWrite[dest] = {
      path: src,
      variables: options,
    };
  }

  writeJSON(json, dest) {
    this.filesToWrite[dest] = {
      json,
    };
  }

  copy(src, dest) {
    this.filesToWrite[dest] = {
      path: src,
    };
  }
}

module.exports = FileManagement;
