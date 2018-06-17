const TemplateBase = require('../SetupTemplateBase');
const { MAX_LINE_LENGTH } = require('../../config/constants');

class EditorConfig extends TemplateBase {
  define() {
    return this.copyTmpl(this.tmplPath('.editorconfig'), '.editorconfig', {
      maxLineLength: MAX_LINE_LENGTH,
    });
  }
}

module.exports = EditorConfig;
