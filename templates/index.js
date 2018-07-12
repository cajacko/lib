#! /usr/bin/env node

const { join } = require('path');
const {
  setVersion,
  run,
  setSetupFiles,
  setTmplPath,
} = require('@cajacko/template');
const config = require('../package.json');
const Projects = require('./setupTemplates/Projects');
const Eslint = require('./setupTemplates/Eslint');
const Flow = require('./setupTemplates/Flow');
const Jest = require('./setupTemplates/Jest');
const Cucumber = require('./setupTemplates/Cucumber');
const GitIgnore = require('./setupTemplates/GitIgnore');
const Readme = require('./setupTemplates/Readme');
const Env = require('./setupTemplates/Env');
const Prettier = require('./setupTemplates/Prettier');
const VSCode = require('./setupTemplates/VSCode');
const Travis = require('./setupTemplates/Travis');
const Privacy = require('./setupTemplates/Privacy');
const EditorConfig = require('./setupTemplates/EditorConfig');
const GitAttributes = require('./setupTemplates/GitAttributes');
const Changelog = require('./setupTemplates/Changelog');
const JSDocs = require('./setupTemplates/JSDocs');
const Example = require('./setupTemplates/Example');

setVersion(config.version);
setTmplPath(join(__dirname, './setupTemplates/files'));

setSetupFiles({
  // project: Projects,
  eslint: Eslint,
  env: Env,
  flow: Flow,
  jest: Jest,
  cucumber: Cucumber,
  gitignore: GitIgnore,
  readme: Readme,
  prettier: Prettier,
  vscode: VSCode,
  travis: Travis,
  privacy: Privacy,
  editorconfig: EditorConfig,
  gitattributes: GitAttributes,
  changelog: Changelog,
  jsdocs: JSDocs,
  example: Example,
});

run();
