const { join } = require('path');
const { ensureFile, writeFile } = require('fs-extra');
const projectDir = require('./utils/project/projectDir');
const copyFile = require('./utils/copyFile');

class TemplateBase {
  constructor(config, template) {
    this.config = config;
    this.template = template;

    this.copyFiles = {};
    this.writeFiles = {};

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

  forEachTemplate(callback) {
    Object.keys(this.config.templates).forEach((key) => {
      callback(this.config.templates[key]);
    });
  }

  tmplPath(path) {
    return join(__dirname, 'files', path);
  }

  write() {
    const promises = [];

    Object.keys(this.copyFiles).forEach((key) => {
      promises.push(copyFile(this.copyFiles[key]));
    });

    Object.keys(this.writeFiles).forEach((key) => {
      const { dest, content } = this.writeFiles[key];

      promises.push(ensureFile(dest).then(() => writeFile(dest, content)));
    });

    return Promise.all(promises);
  }

  copy(src, dest, key, additionalProps) {
    this.copyFiles[key || 'main'] = {
      src,
      dest: join(this.projectDir, dest),
      ...additionalProps,
    };
  }

  copyIfDoesNotExist(src, dest, key, additionalProps) {
    return this.copy(src, dest, key, {
      onlyIfDoesNotExist: true,
      ...additionalProps,
    });
  }

  copyTmpl(src, dest, data, key, additionalProps) {
    return this.copy(src, dest, key, { data, ...additionalProps });
  }

  writeJSON(data, dest, key) {
    const content = JSON.stringify(data, null, 2);

    this.writeFiles[key || 'main'] = {
      dest: join(this.projectDir, dest),
      content,
    };
  }

  addNodeModules(...args) {
    return this.template.addNodeModules(...args);
  }
}

module.exports = TemplateBase;
