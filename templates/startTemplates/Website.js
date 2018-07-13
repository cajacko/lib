const { StartTemplate } = require('@cajacko/template');
const { join } = require('path');

class Website extends StartTemplate {
  constructor(...args) {
    super(...args);

    this.setTemplateSrc(join(__dirname, '../runTemplates/web'));
    this.setSrcDestination('src/projectFiles');

    this.installDependencies = this.installDependencies.bind(this);
    this.copy = this.copy.bind(this);
    this.run = this.run.bind(this);
  }

  copy() {
    const entryPath = this.config.entryFile;

    // TODO:
    // Copy dependencies from lib, and put inside the template dir

    return Promise.all([
      this.fs.copyTmpl(
        join(__dirname, '../runTemplates/webConfig.js'),
        join(this.tmpDir, 'src/config.js'),
        { entryPath },
      ),
      this.copySrcDependencies(),
    ]);
  }

  installDependencies() {
    return this.runCommand('yarn install', this.tmpDir);
  }

  run() {
    return this.runCommand('yarn start', this.tmpDir);
  }

  postWatch() {
    const buildTo = join(this.tmpDir, 'node_modules/@cajacko/lib/dist');

    return this.runCommand(`yarn build:lib --${buildTo}`, join(__dirname, '../../')).then(() => {
      this.runCommand(`yarn watch:lib --${buildTo}`, join(__dirname, '../../'));
    });
  }
}

module.exports = Website;
