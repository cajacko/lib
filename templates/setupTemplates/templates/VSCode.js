const RunnerTemplate = require('../RunnerTemplate');
const { MAX_LINE_LENGTH } = require('../../config/constants');

class VSCode extends RunnerTemplate {
  setupFiles() {
    return this.runner.copyTmpl(
      this.tmplPath('.vscode/settings.json'),
      '.vscode/settings.json',
      {
        maxLineLength: MAX_LINE_LENGTH,
      },
    );
  }
}

module.exports = VSCode;
