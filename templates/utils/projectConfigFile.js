const { writeJSON, readJSON } = require('fs-extra');
const { join } = require('path');
const projectDir = require('./projectDir');

const getProjectConfigFilePath = () =>
  projectDir.get().then(dir => join(dir, 'project.json'));

exports.set = contents =>
  getProjectConfigFilePath().then(path =>
    writeJSON(path, contents, { spaces: 2 }));

exports.get = () =>
  getProjectConfigFilePath()
    .then(path => readJSON(path))
    .catch(() => null);
