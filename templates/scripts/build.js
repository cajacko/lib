const program = require('commander');
const ensureProjectSelected = require('../utils/ensureProjectSelected');
const build = require('../utils/build');

program
  .command('build [package]')
  .action(temlplateArg => ensureProjectSelected(temlplateArg).then(build));
