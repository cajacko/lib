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

class Template {
  constructor(config) {
    this.config = config;

    this.eslint = new Eslint(config);
    this.flow = new Flow(config);
    this.jest = new Jest(config);
    this.cucumber = new Cucumber(config);
    this.gitignore = new GitIgnore(config);
    this.readme = new Readme(config);
    this.env = new Env(config);
    this.prettier = new Prettier(config);
    this.vscode = new VSCode(config);
    this.entryFiles = new EntryFiles(config);
    this.travis = new Travis(config);
    this.privacy = new Privacy(config);
    this.editorConfig = new EditorConfig(config);
    this.gitAttributes = new GitAttributes(config);

    this.writeAllFiles = this.writeAllFiles.bind(this);
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
      .then(this.gitAttributes.defineFromConfig);
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
      this.privacy.write(),
    ]);
  }

  run() {
    return this.defineAll().then(this.writeAllFiles);
  }
}

module.exports = Template;
