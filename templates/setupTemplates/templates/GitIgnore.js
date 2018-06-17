const TemplateBase = require('../SetupTemplateBase');

class GitIgnore extends TemplateBase {
  define() {
    return this.copy(this.tmplPath('.gitignore'), '.gitignore');
  }
}

module.exports = GitIgnore;
