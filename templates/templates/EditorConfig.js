const TemplateBase = require('./TemplateBase');

class EditorConfig extends TemplateBase {
  define() {
    return this.copy(this.tmplPath('.editorconfig'), '.editorconfig');
  }
}

module.exports = EditorConfig;
