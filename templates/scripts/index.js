#! /usr/bin/env node

const program = require('commander');
const config = require('../../package.json');

program.version(config.version).arguments('<cmd> [options]');

require('./init');

program.command('*', { noHelp: true }).action((cmd) => {
  console.error('\nUnknown given! See the help below');
  program.outputHelp();
  process.exit(1);
});

program.parse(process.argv);
