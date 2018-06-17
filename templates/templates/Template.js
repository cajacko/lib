const Queue = require('promise-queue');
const merge = require('lodash/merge');
const Eslint = require('./Eslint');
const Flow = require('./Flow');
const Jest = require('./Jest');
const Cucumber = require('./Cucumber');
const GitIgnore = require('./GitIgnore');
const Readme = require('./Readme');
const Env = require('./Env');
const Prettier = require('./Prettier');
const VSCode = require('./VSCode');
const EntryFiles = require('./EntryFiles');
const Travis = require('./Travis');
const Privacy = require('./Privacy');
const EditorConfig = require('./EditorConfig');
const GitAttributes = require('./GitAttributes');
const Changelog = require('./Changelog');
const runCommand = require('../utils/runCommand');

class Template {
  constructor(config) {
    this.config = config;
    this.nodeModules = {};

    this.eslint = new Eslint(config, this);
    this.flow = new Flow(config, this);
    this.jest = new Jest(config, this);
    this.cucumber = new Cucumber(config, this);
    this.gitignore = new GitIgnore(config, this);
    this.readme = new Readme(config, this);
    this.env = new Env(config, this);
    this.prettier = new Prettier(config, this);
    this.vscode = new VSCode(config, this);
    this.entryFiles = new EntryFiles(config, this);
    this.travis = new Travis(config, this);
    this.privacy = new Privacy(config, this);
    this.editorConfig = new EditorConfig(config, this);
    this.gitAttributes = new GitAttributes(config, this);
    this.changelog = new Changelog(config, this);

    this.writeAllFiles = this.writeAllFiles.bind(this);
    this.installDependencies = this.installDependencies.bind(this);
    this.addNodeModules = this.addNodeModules.bind(this);
  }

  defineAll() {
    return Promise.resolve()
      .then(this.eslint.defineFromConfig)
      .then(this.flow.defineFromConfig)
      .then(this.jest.defineFromConfig)
      .then(this.cucumber.defineFromConfig)
      .then(this.gitignore.defineFromConfig)
      .then(this.readme.defineFromConfig)
      .then(this.env.defineFromConfig)
      .then(this.prettier.defineFromConfig)
      .then(this.vscode.defineFromConfig)
      .then(this.entryFiles.defineFromConfig)
      .then(this.travis.defineFromConfig)
      .then(this.privacy.defineFromConfig)
      .then(this.editorConfig.defineFromConfig)
      .then(this.gitAttributes.defineFromConfig)
      .then(this.changelog.defineFromConfig);
  }

  writeAllFiles() {
    return Promise.all([
      this.eslint.write(),
      this.flow.write(),
      this.jest.write(),
      this.cucumber.write(),
      this.gitignore.write(),
      this.readme.write(),
      this.env.write(),
      this.prettier.write(),
      this.vscode.write(),
      this.entryFiles.write(),
      this.travis.write(),
      this.privacy.write(),
      this.editorConfig.write(),
      this.gitAttributes.write(),
      this.changelog.write(),
    ]);
  }

  installDependencies() {
    const nodeModulesCommands = {};

    Object.keys(this.nodeModules).forEach((key) => {
      const { type, version } = this.nodeModules[key];
      const finalType = type || 'dependency';

      if (!nodeModulesCommands[finalType]) nodeModulesCommands[finalType] = '';

      nodeModulesCommands[finalType] = `${
        nodeModulesCommands[finalType]
      } ${key}@${version}`;
    });

    const installPromise = new Queue(1, Infinity);

    Object.keys(nodeModulesCommands).forEach((key) => {
      let command = 'yarn add';

      if (key !== 'dependency') command = `${command} --${key}`;

      command = `${command} ${nodeModulesCommands[key]}`;

      installPromise.add(() => runCommand(command, this.projectDir));
    });

    return installPromise;
  }

  run() {
    return this.defineAll()
      .then(this.writeAllFiles)
      .then(this.installDependencies);
  }

  addNodeModules(modules) {
    merge(this.nodeModules, modules);
  }
}

module.exports = Template;
