const { copy, ensureFile, pathExists } = require('fs-extra');
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
      let promise;
      const { src, dest, onlyIfDoesNotExist } = this.copyFiles[key];

      const copyFile = () =>
        ensureFile(dest).then(() => {
          copy(src, dest);
        });

      if (onlyIfDoesNotExist) {
        promise = pathExists(dest).then((exists) => {
          if (exists) return Promise.resolve();

          return copyFile();
        });
      } else {
        promise = copyFile();
      }

      promises.push(promise);
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

  copyIfDoesNotExist(src, dest, key) {
    return this.copy(src, dest, key, { onlyIfDoesNotExist: true });
  }
}

module.exports = TemplateBase;
