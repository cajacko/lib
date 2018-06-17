const TemplateBase = require('../SetupTemplateBase');

class Readme extends TemplateBase {
  define() {
    return this.copyTmpl(
      this.tmplPath('readme/header.md'),
      'README.md',
      this.config,
    );
  }
}

module.exports = Readme;