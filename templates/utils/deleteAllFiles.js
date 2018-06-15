const rimraf = require('rimraf');
const globby = require('globby');

const projectDir = require('./project/projectDir');

module.exports = (dir) => {
  const deleteDir = dirToDelete =>
    globby([`${dirToDelete}/**/*`, `${dirToDelete}/**/.*`]).then((paths) => {
      paths.forEach((item) => {
        rimraf.sync(item);
      });
    });

  if (dir) return deleteDir(dir);

  return projectDir.get().then(deleteDir);
};
