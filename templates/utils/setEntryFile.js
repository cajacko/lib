const { join } = require('path');
const { ensureFile, writeFile } = require('fs-extra');

module.exports = (entryFile, templateDir) => {
  const templateEntryFilePath = join(templateDir, 'src/config.js');

  const relativeEntryPath = entryFile.replace('src/', '').replace('.js', '');

  const contents = `// @flow

import * as config from './projectFiles/${relativeEntryPath}';

export default config;
export * from './projectFiles/${relativeEntryPath}';\n`;

  return ensureFile(templateEntryFilePath).then(() =>
    writeFile(templateEntryFilePath, contents));
};
