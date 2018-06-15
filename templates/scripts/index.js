#! /usr/bin/env node

const program = require('commander');
const config = require('../../package.json');

program.version(config.version).arguments('<cmd> [options]');

require('./init');
require('./add');

program.command('*', { noHelp: true }).action(() => {
  console.error('\nUnknown command given! See the help below');
  program.outputHelp();
  process.exit(1);
});

program.parse(process.argv);