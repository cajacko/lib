#! /usr/bin/env node

const { join } = require('path');
const {
  setVersion,
  run,
  setSetupFiles,
  setTmplPath,
  setTemplateClasses,
  setPackageName,
} = require('@cajacko/template');
const config = require('../package.json');

setPackageName(config.name);
setVersion(config.version);
setTmplPath(join(__dirname, './setupTemplates/files'));

setSetupFiles({
  // project: require('./setupTemplates/Projects'),
  eslint: require('./setupTemplates/Eslint'),
  env: require('./setupTemplates/Env'),
  flow: require('./setupTemplates/Flow'),
  jest: require('./setupTemplates/Jest'),
  cucumber: require('./setupTemplates/Cucumber'),
  gitignore: require('./setupTemplates/GitIgnore'),
  readme: require('./setupTemplates/Readme'),
  prettier: require('./setupTemplates/Prettier'),
  vscode: require('./setupTemplates/VSCode'),
  travis: require('./setupTemplates/Travis'),
  privacy: require('./setupTemplates/Privacy'),
  editorconfig: require('./setupTemplates/EditorConfig'),
  gitattributes: require('./setupTemplates/GitAttributes'),
  changelog: require('./setupTemplates/Changelog'),
  jsdocs: require('./setupTemplates/JSDocs'),
  example: require('./setupTemplates/Example'),
});

setTemplateClasses({
  website: require('./startTemplates/Website'),
});

run();
