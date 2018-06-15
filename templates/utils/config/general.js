const inquirer = require('inquirer');
const merge = require('lodash/merge');
const questions = require('./questions/general');
const projectName = require('../projectName');
const { getOrigin } = require('../git');

const setProjectName = (cb, missingKeys) => {
  if (missingKeys && !missingKeys.includes('projectName')) {
    return Promise.resolve();
  }

  return projectName.get().then(name => cb({ projectName: name }));
};

const defineConfigFromRepo = (cb, missingKeys) => () => {
  if (missingKeys && !missingKeys.includes('githubRepo')) {
    return Promise.resolve();
  }

  return getOrigin().then((origin) => {
    let githubRepo = null;

    if (origin && origin.includes('github.com')) {
      const matches = /github\.com[:/](.*)\.git/.exec(origin);
      githubRepo = `https://github.com/${matches[1]}`;
    }

    cb({ githubRepo });
  });
};

exports.configKeys = questions
  .map(({ name }) => name)
  // Custom keys not in the questions
  .concat(['projectName', 'githubRepo']);

exports.run = (existingConfig, missingKeys) => {
  const config = existingConfig ? Object.assign({}, existingConfig) : {};

  const set = obj => merge(config, obj);

  return setProjectName(set, missingKeys)
    .then(defineConfigFromRepo(set, missingKeys))
    .then(() => {
      const filteredQuestions = !missingKeys
        ? questions
        : questions.filter(({ name }) => missingKeys.includes(name));

      return inquirer.prompt(filteredQuestions);
    })
    .then(set)
    .then(() => config);
};
