const TemplateBase = require('../SetupTemplateBase');
const { MAX_LINE_LENGTH } = require('../../config/constants');

class VSCode extends TemplateBase {
  define() {
    return this.copyTmpl(
      this.tmplPath('.vscode/settings.json'),
      '.vscode/settings.json',
      {
        maxLineLength: MAX_LINE_LENGTH,
      },
    );
  }
}

module.exports = VSCode;
