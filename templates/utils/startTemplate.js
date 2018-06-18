const { join } = require('path');
const { ensureFile, writeFile } = require('fs-extra');
const runCommand = require('./runCommand');
const projectDir = require('./project/projectDir');
const syncDirs = require('./fs/syncDirs');
const watchLib = require('./watchLib');

const getTemplateDir = (template) => {
  switch (template) {
    case 'website':
      return 'web';

    default:
      throw new Error(`Given template does not exist in @cajacko/lib: ${String(template)}`);
  }
};

const getTemplatePath = template =>
  join(__dirname, '../runTemplates', getTemplateDir(template));

const setEntryFile = (entryFile, templateDir) => {
  const templateEntryFilePath = join(templateDir, 'src/config.js');

  const relativeEntryPath = entryFile.replace('src/', '').replace('.js', '');

  const contents = `// @flow

import * as config from './projectFiles/${relativeEntryPath}';

export default config;
export * from './projectFiles/${relativeEntryPath}';\n`;

  return ensureFile(templateEntryFilePath).then(() =>
    writeFile(templateEntryFilePath, contents));
};

module.exports = (key, { entryFile, template }) => {
  const templateDir = getTemplateDir(template);
  const templatePath = getTemplatePath(template);

  return runCommand('yarn', templatePath)
    .then(projectDir.get)
    .then(dir =>
      Promise.all([
        watchLib(templateDir),
        syncDirs(join(dir, 'src'), join(templatePath, 'src/projectFiles')).then(() => setEntryFile(entryFile, templatePath)),
      ]))
    .then(() => runCommand('yarn start', templatePath));
};
