const { join } = require('path');
const { ensureFile, writeFile } = require('fs-extra');
const runCommand = require('./runCommand');
const projectDir = require('./project/projectDir');
const syncDirs = require('./fs/syncDirs');

const getTemplateDir = (template) => {
  switch (template) {
    case 'website':
      return join(__dirname, '../runTemplates/web');

    default:
      throw new Error(`Given template does not exist in @cajacko/lib: ${String(template)}`);
  }
};

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

  return runCommand('yarn', templateDir)
    .then(projectDir.get)
    .then(dir =>
      Promise.all([
        syncDirs(join(dir, 'src'), join(templateDir, 'src/projectFiles')).then(() => setEntryFile(entryFile, templateDir)),
        syncDirs(
          join(__dirname, '../../dist'),
          join(templateDir, 'node_modules/@cajacko/lib/dist'),
        ),
      ]))
    .then(() => runCommand('yarn start', templateDir));
};
