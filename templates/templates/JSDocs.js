const TemplateBase = require('../TemplateBase');

class JSDocs extends TemplateBase {
  define() {
    const promises = [];

    promises.push(this.copy(this.tmplPath('jsdoc.json'), 'jsdoc.json'));

    promises.push(this.addNodeModules({
      jsdoc: { type: 'dev', version: '3.5.5' },
    }));

    return Promise.all(promises);
  }
}

module.exports = JSDocs;
