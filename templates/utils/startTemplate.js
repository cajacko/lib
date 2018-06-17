const { join } = require('path');
const { ensureFile, writeFile } = require('fs-extra');
const runCommand = require('./runCommand');
const projectDir = require('./project/projectDir');
const syncDirs = require('./syncDirs');

const getTemplateDir = (template) => {
  switch (template) {
    case 'website':
      return join(__dirname, '../runTemplates/web');

    default:
      throw new Error(`Given template does not exist in @cajacko/lib: ${String(template)}`);
  }
};

const setEntryFile = (entryFile, templateDir) => {
  const templateEntryFilePath = join(templateDir, 'src/entry.js');

  const relativeEntryPath = entryFile.replace('src/', '');

  const contents = `export { default } from './projectFiles/${relativeEntryPath}'`;

  return ensureFile(templateEntryFilePath).then(() =>
    writeFile(templateEntryFilePath, contents));
};

module.exports = (key, { entryFile, template }) => {
  const templateDir = getTemplateDir(template);

  return runCommand('yarn', templateDir)
    .then(projectDir.get)
    .then(dir =>
      syncDirs(join(dir, 'src'), join(templateDir, 'src/projectFiles')))
    .then(() => setEntryFile(entryFile, templateDir))
    .then(() => runCommand('yarn start', templateDir));
};
