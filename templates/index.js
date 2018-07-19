#! /usr/bin/env node

/* eslint global-require: 0 */

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
setTmplPath(join(__dirname, './templates/files'));

setSetupFiles({
  project: require('./templates/Projects.2'),
  packagejson: require('./templates/PackageJSON'),
  git: require('./templates/Git'),
  eslint: require('./templates/Eslint'),
  dotenv: require('./templates/Env'),
  flow: require('./templates/Flow'),
  jest: require('./templates/Jest'),
  cucumber: require('./templates/Cucumber'),
  gitignore: require('./templates/GitIgnore'),
  readme: require('./templates/Readme'),
  prettier: require('./templates/Prettier'),
  vscode: require('./templates/VSCode'),
  travis: require('./templates/Travis'),
  privacy: require('./templates/Privacy'),
  editorconfig: require('./templates/EditorConfig'),
  gitattributes: require('./templates/GitAttributes'),
  changelog: require('./templates/Changelog'),
  jsdocs: require('./templates/JSDocs'),
  example: require('./templates/Example'),
});

setTemplateClasses({
  website: require('./startTemplates/Website'),
});

run();
