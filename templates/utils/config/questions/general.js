const semver = require('semver');
const validator = require('validator');

module.exports = [
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
    filter: keywords => (!keywords || !keywords.length ? null : keywords),
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
    name: 'publicOnNPM',
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
    filter: email => (!email || !email.length ? null : email),
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
];
