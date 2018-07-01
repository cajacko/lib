const { remove } = require('fs-extra');
const { join } = require('path');
const getTemplateDir = require('./getTemplateDir');
const getTemplatePath = require('./getTemplatePath');
const runCommand = require('./runCommand');
const projectDir = require('./project/projectDir');
const setEntryFile = require('./setEntryFile');
const { build } = require('./lib');
const copyDir = require('./fs/copyDir');
const getBuildDir = require('./getBuildDir');

module.exports = (data) => {
  const {
    key,
    config: { entryFile, template },
  } = data;

  const templateDir = getTemplateDir(template);
  const templatePath = getTemplatePath(template);

  return runCommand('yarn', templatePath)
    .then(() => getBuildDir(key))
    .then(buildDir =>
      remove(buildDir)
        .then(projectDir.get)
        .then(dir =>
          Promise.all([
            build(templateDir),
            copyDir(
              join(dir, 'src'),
              join(templatePath, 'src/projectFiles'),
            ).then(() => setEntryFile(entryFile, templatePath)),
          ])
            .then(() => runCommand('yarn build', templatePath))
            .then(() =>
              copyDir(join(templatePath, 'build'), join(buildDir, 'dist')))));
};
