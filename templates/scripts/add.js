const program = require('commander');
const add = require('../utils/config/add');
const projectConfigFile = require('../utils/project/projectConfigFile');

program
  .command('add')
  .action(() => add(config => projectConfigFile.update(config)));
