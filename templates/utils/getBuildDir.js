const { join } = require('path');
const projectDir = require('./project/projectDir');

module.exports = projectName =>
  projectDir.get().then(dir => join(dir, 'build', projectName));
