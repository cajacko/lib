const { join } = require('path');
const runCommand = require('./runCommand');

module.exports = templateDir =>
  runCommand(`yarn build:lib --${templateDir}`, join(__dirname, '../../')).then(() => {
    runCommand(`yarn watch:lib --${templateDir}`, join(__dirname, '../../'));
  });
