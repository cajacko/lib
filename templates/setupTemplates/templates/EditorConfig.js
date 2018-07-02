const RunnerTemplate = require('../RunnerTemplate');
const { MAX_LINE_LENGTH } = require('../../config/constants');

class EditorConfig extends RunnerTemplate {
  setupFiles() {
    return this.runner.copyTmpl(
      this.tmplPath('.editorconfig'),
      this.destPath('.editorconfig'),
      {
        maxLineLength: MAX_LINE_LENGTH,
      },
    );
  }
}

module.exports = EditorConfig;
