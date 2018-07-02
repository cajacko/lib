const Dependencies = require('./Dependencies');

class FileManagement extends Dependencies {
  constructor() {
    super();

    this.writeFiles = {};
  }

  copyIfDoesNotExist(src, dest) {
    this.writeFiles[dest] = {
      type: 'copy',
      onlyIfDoesNotExist: true,
      path: src,
    };
  }

  copyTmpl(src, dest, options) {
    this.writeFiles[dest] = {
      type: 'copy',
      withTemplate: true,
      path: dest,
      variables: options,
    };
  }

  writeJSON(json, dest) {
    this.writeFiles[dest] = {
      type: 'writeJSON',
      json,
    };
  }

  copy(src, dest) {
    this.writeFiles[dest] = {
      type: 'copy',
      path: src,
    };
  }
}

module.exports = FileManagement;
