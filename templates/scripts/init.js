const program = require('commander');
const runSetup = require('../setupTemplates/runSetup');

program.command('init').action(runSetup);
