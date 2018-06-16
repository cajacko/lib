class TemplateBase {
  constructor(config) {
    this.config = config;
  }

  defineFromConfig() {
    return Promise.resolve();
  }

  write() {
    return Promise.resolve();
  }
}

module.exports = TemplateBase;
