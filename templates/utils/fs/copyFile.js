const ejs = require('ejs');
const {
  copy,
  ensureFile,
  pathExists,
  readFile,
  writeFile,
} = require('fs-extra');

const conditionallyCheckIfExists = (dest, onlyIfDoesNotExist, cb) => {
  if (onlyIfDoesNotExist) {
    return pathExists(dest).then((exists) => {
      if (exists) return Promise.resolve();

      return cb();
    });
  }

  return cb();
};

module.exports = ({
  src, dest, onlyIfDoesNotExist, data,
}) =>
  conditionallyCheckIfExists(dest, onlyIfDoesNotExist, () =>
    ensureFile(dest).then(() => {
      if (data) {
        return readFile(src).then((contents) => {
          const template = ejs.compile(contents.toString());

          const finalContents = template(data);

          return writeFile(dest, finalContents);
        });
      }

      return copy(src, dest);
    }));
