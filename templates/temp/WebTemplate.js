const ProjectTemplate = require('./ProjectTemplate');

class WebTemplate extends ProjectTemplate {
  init() {
    this.runner.add('setupFiles', () => {});
  }
}

module.exports = WebTemplate;
