const inquirer = require('inquirer');
const merge = require('lodash/merge');
const semver = require('semver');
const validator = require('validator');
const projectName = require('../projectName');
const { getOrigin } = require('../git');

const setProjectName = cb =>
  projectName.get().then(name => cb({ projectName: name }));

const defineConfigFromRepo = cb => () =>
  getOrigin().then((origin) => {
    if (!origin) return;
    if (!origin.includes('github.com')) return;

    const matches = /github\.com[:/](.*)\.git/.exec(origin);

    cb({
      githubRepo: `https://github.com/${matches[1]}`,
    });
  });

module.exports = () => {
  const config = {};

  const set = obj => merge(config, obj);

  return setProjectName(set)
    .then(defineConfigFromRepo(set))
    .then(() =>
      inquirer.prompt([
        {
          type: 'input',
          name: 'version',
          default: '0.1.0',
          message: 'Initial project version to set',
          validate: version =>
            !!semver.valid(version) || `${version} is not a valid semver`,
        },
        {
          type: 'input',
          name: 'description',
          message: 'Description for this project',
          validate: (description) => {
            if (!description) return 'you must provide a description';
            if (description.length < 10) {
              return 'Please provide a description longer than 10 characters';
            }
            if (description.length > 300) {
              return 'Please provide a description shorter than 300 characters';
            }

            return true;
          },
        },
        {
          type: 'input',
          name: 'keywords',
          message:
            "Add some keywords for package.json, we'll automatically include tags for all technologies supplied by the lib module for your project.",
        },
        {
          type: 'boolean',
          name: 'noLicense',
          default: false,
          message: 'Should this project have NO LICENSE set?',
        },
        {
          type: 'boolean',
          name: 'isPublic',
          default: false,
          message: 'Is this project going to be published to npm?',
        },
        {
          type: 'input',
          name: 'authorName',
          default: 'Charlie Jackson',
          message: 'The project authors name',
        },
        {
          type: 'input',
          name: 'authorEmail',
          default: 'contact@charliejackson.com',
          message: 'The project authors email address',
        },
        {
          type: 'input',
          name: 'authorUrl',
          default: 'https://charliejackson.copm',
          message: 'The project authors url',
        },
        {
          type: 'input',
          name: 'bugEmail',
          message:
            "Supply a custom email for bugs here or we'll use the author email as a fallback",
          validate: (email) => {
            if (!email) return true;

            return (
              validator.isEmail(email) ||
              'Please supply a valid email address or leave empty for the default'
            );
          },
        },
      ]))
    .then(({
      version,
      description,
      keywords,
      noLicense,
      isPublic,
      authorName,
      authorEmail,
      authorUrl,
      bugEmail,
    }) => {
      const configToSet = {
        version,
        description,
        license: noLicense ? 'NO_LICENSE' : 'MIT',
        private: !isPublic,
        authorName,
        authorEmail,
        authorUrl,
      };

      if (keywords && keywords.length) configToSet.keywords = keywords;
      if (bugEmail && bugEmail.length) configToSet.bugEmail = bugEmail;

      set(configToSet);
    })
    .then(() => config);
};
