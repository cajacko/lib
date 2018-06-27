const program = require('commander');
const ensureProjectSelected = require('../utils/ensureProjectSelected');

program.command('build [package]').action(temlplateArg =>
  ensureProjectSelected(temlplateArg).then((data) => {
    const {
      config: { entryFile, template },
    } = data;

    console.log(entryFile, template);
  }));
