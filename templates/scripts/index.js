#! /usr/bin/env node

const program = require('commander');
const config = require('../../package.json');

let cmdValue;

program
  .version(config.version)
  .arguments('<cmd> [options]')
  .action((cmd) => {
    cmdValue = cmd;
  });

require('./init');

program.command('*', { noHelp: true }).action(() => {
  console.error('\nUnknown given! See the help below');
  program.outputHelp();
  process.exit(1);
});

program.parse(process.argv);

if (!cmdValue) {
  console.error('\nNo command given! See the help below');
  program.outputHelp();
  process.exit(1);
}
