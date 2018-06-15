const { writeJSON, readJSON } = require('fs-extra');
const merge = require('lodash/merge');
const { join } = require('path');
const projectDir = require('./projectDir');

const getProjectConfigFilePath = () =>
  projectDir.get().then(dir => join(dir, 'project.json'));

const set = contents =>
  getProjectConfigFilePath().then(path =>
    writeJSON(path, contents, { spaces: 2 }));

const get = () =>
  getProjectConfigFilePath()
    .then(path => readJSON(path))
    .catch(() => null);

exports.set = set;
exports.get = get;

exports.update = newUpdates =>
  get().then((contents) => {
    const newContent = merge(contents, newUpdates);

    return set(newContent);
  });
