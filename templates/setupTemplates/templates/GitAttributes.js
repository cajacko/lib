const TemplateBase = require('../SetupTemplateBase');

class GitAttributes extends TemplateBase {
  define() {
    return this.copy(this.tmplPath('.gitattributes'), '.gitattributes');
  }
}

module.exports = GitAttributes;