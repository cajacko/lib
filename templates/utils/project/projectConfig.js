const { run, configKeys } = require('../config/general');
const projectConfigFile = require('./projectConfigFile');

const getAllProjectConfigKeys = () => configKeys;

exports.getProjectConfig = projectConfigFile.get;

exports.getMissingConfigKeys = (config) => {
  const allConfigKeys = getAllProjectConfigKeys();
  const suppliedConfigKeys = Object.keys(config);

  const missingKeys = [];

  allConfigKeys.forEach((key) => {
    if (suppliedConfigKeys.includes(key)) return;

    missingKeys.push(key);
  });

  return Promise.resolve(missingKeys.length ? missingKeys : null);
};

const askAndSetProjectConfig = (config, missingKeys) =>
  run(config, missingKeys);

exports.askAndSetProjectConfig = askAndSetProjectConfig;

exports.askForOutstandingProjectConfigAndSet = (config, missingKeys) =>
  askAndSetProjectConfig(config, missingKeys);
