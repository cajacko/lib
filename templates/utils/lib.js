const { join } = require('path');
const runCommand = require('./runCommand');

const build = templateDir =>
  runCommand(`yarn build:lib --${templateDir}`, join(__dirname, '../../'));

exports.watch = templateDir =>
  build(templateDir).then(() => {
    runCommand(`yarn watch:lib --${templateDir}`, join(__dirname, '../../'));
  });

exports.build = build;
