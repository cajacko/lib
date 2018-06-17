const { ensureFile } = require('fs-extra');
const TemplateBase = require('../SetupTemplateBase');

class EntryFiles extends TemplateBase {
  define() {
    const promises = [];

    this.forEachTemplate(({ entryFile }) => {
      promises.push(ensureFile(entryFile));
    });

    return Promise.all(promises);
  }
}

module.exports = EntryFiles;
