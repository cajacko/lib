const TemplateBase = require('../SetupTemplateBase');

class Privacy extends TemplateBase {
  define() {
    return this.copyTmpl(
      this.tmplPath('PRIVACY.md'),
      'PRIVACY.md',
      this.config,
    );
  }
}

module.exports = Privacy;