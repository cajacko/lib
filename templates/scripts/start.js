const program = require('commander');
const ensureProjectSelected = require('../utils/ensureProjectSelected');
const { join } = require('path');
const runCommand = require('../utils/runCommand');
const projectDir = require('../utils/project/projectDir');
const syncDirs = require('../utils/fs/syncDirs');
const { watch } = require('../utils/lib');
const getTemplateDir = require('../utils/getTemplateDir');
const getTemplatePath = require('../utils/getTemplatePath');
const setEntryFile = require('../utils/setEntryFile');

program.command('start [package]').action(temlplateArg =>
  ensureProjectSelected(temlplateArg).then((data) => {
    const {
      config: { entryFile, template },
    } = data;

    const templateDir = getTemplateDir(template);
    const templatePath = getTemplatePath(template);

    return runCommand('yarn', templatePath)
      .then(projectDir.get)
      .then(dir =>
        Promise.all([
          watch(templateDir),
          syncDirs(
            join(dir, 'src'),
            join(templatePath, 'src/projectFiles'),
          ).then(() => setEntryFile(entryFile, templatePath)),
        ]))
      .then(() => runCommand('yarn start', templatePath));
  }));
