#! /usr/bin/env node

const program = require('commander');
const config = require('../../package.json');

program.version(config.version);

require('./init');

program.parse(process.argv);
