const { join } = require('path');
const getTemplateDir = require('../utils/getTemplateDir');

module.exports = template =>
  join(__dirname, '../runTemplates', getTemplateDir(template));
