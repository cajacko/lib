const { copy, ensureFile } = require('fs-extra');
const { join } = require('path');
const projectDir = require('../utils/project/projectDir');

class TemplateBase {
  constructor(config) {
    this.config = config;

    this.copyFiles = {};

    this.defineFromConfig = this.defineFromConfig.bind(this);
  }

  ensureInit() {
    return projectDir.get().then((dir) => {
      this.projectDir = dir;
    });
  }

  defineFromConfig() {
    return this.ensureInit().then(() => {
      if (this.define) return this.define();

      return Promise.resolve();
    });
  }

  tmplPath(path) {
    return join(__dirname, 'files', path);
  }

  write() {
    const promises = [];

    Object.keys(this.copyFiles).forEach((key) => {
      const { src, dest } = this.copyFiles[key];

      promises.push(ensureFile(dest).then(() => copy(src, dest)));
    });

    return Promise.all(promises);
  }

  copy(src, dest, key) {
    this.copyFiles[key || 'main'] = {
      src,
      dest: join(this.projectDir, dest),
    };
  }
}

module.exports = TemplateBase;
