const Template = require('../Template');

module.exports = (config) => {
  const template = new Template(config);

  return template.run();
};
