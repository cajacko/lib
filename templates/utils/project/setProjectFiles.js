const projectConfigFile = require('./projectConfigFile');
const packageJSON = require('../config/packageJSON');

module.exports = (config) => {
  const promises = [];

  promises.push(projectConfigFile.set(config));

  promises.push(packageJSON.set(config));

  return Promise.all(promises);
};
