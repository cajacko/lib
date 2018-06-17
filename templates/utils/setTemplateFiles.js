const Template = require('../setupTemplates/SetupTemplate');

module.exports = (config) => {
  const template = new Template(config);

  return template.run();
};
