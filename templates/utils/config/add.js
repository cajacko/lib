const inquirer = require('inquirer');
const isSlug = require('../conditionals/isSlug');
const getTemplateConfig = require('./getTemplateConfig');

const add = implement =>
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'template',
        message: 'What template would you like to add to this project?',
        choices: ['Website', 'Mobile App', 'Desktop App', 'Cloud Function'],
      },
      {
        type: 'input',
        name: 'key',
        message:
          'Give this template a unique key to distinguish it from other templates in this project.',
        validate: (name) => {
          if (!isSlug(name)) {
            return 'The key must be in a url slug like format e.g. repo-name';
          }

          return true;
        },
      },
      {
        type: 'input',
        name: 'entryFile',
        message:
          'Where is the entry file for this template going to live. From the project root e.g. src/entry.js',
        default: 'src/entry.js',
      },
    ])
    .then(({ template, key, entryFile }) =>
      getTemplateConfig(template).then(templateConfig => ({
        templates: { [key]: { template, entryFile, ...templateConfig } },
      })))
    .then(implement)
    .then(() =>
      inquirer.prompt([
        {
          type: 'boolean',
          name: 'addAnother',
          message: 'Do you want to add another template?',
          default: false,
        },
      ]))
    .then(({ addAnother }) => {
      if (addAnother) return add();

      return Promise.resolve();
    });

module.exports = add;
