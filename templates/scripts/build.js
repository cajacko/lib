const program = require('commander');
const ensureProjectSelected = require('../utils/ensureProjectSelected');
const getTemplateDir = require('../utils/getTemplateDir');
const getTemplatePath = require('../utils/getTemplatePath');
const runCommand = require('../utils/runCommand');
const projectDir = require('../utils/project/projectDir');
const { join } = require('path');
const setEntryFile = require('../utils/setEntryFile');
const { build } = require('../utils/lib');
const copyDir = require('../utils/fs/copyDir');

program.command('build [package]').action(temlplateArg =>
  ensureProjectSelected(temlplateArg).then((data) => {
    const {
      key,
      config: { entryFile, template },
    } = data;

    const templateDir = getTemplateDir(template);
    const templatePath = getTemplatePath(template);

    return runCommand('yarn', templatePath)
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
            copyDir(join(templatePath, 'build'), join(dir, `build/${key}`))));
  }));
