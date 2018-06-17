const TemplateBase = require('../SetupTemplateBase');

class Changelog extends TemplateBase {
  define() {
    return this.copyIfDoesNotExist(
      this.tmplPath('CHANGELOG.md'),
      'CHANGELOG.md',
    );
  }
}

module.exports = Changelog;
