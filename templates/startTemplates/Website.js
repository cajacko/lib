const { StartTemplate } = require('@cajacko/template');
const { join } = require('path');

class Website extends StartTemplate {
  constructor(...args) {
    super(...args);

    this.setTemplateSrc(join(__dirname, '../runTemplates/web'));
    this.setSrcDestination('src/projectFiles');

    this.installDependencies = this.installDependencies.bind(this);
    this.copy = this.copy.bind(this);
  }

  copy() {
    const entryPath = this.config.entryFile;

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
}

module.exports = Website;
