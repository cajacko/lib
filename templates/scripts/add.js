const program = require('commander');
const inquirer = require('inquirer');
const addWebsite = require('./add/addWebsite');

const add = () =>
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'template',
        message: 'What template would you like to add to this project?',
        choices: ['Website', 'Mobile App', 'Desktop App', 'Cloud Function'],
      },
    ])
    .then(({ template }) => {
      if (template === 'Website') return addWebsite();

      return Promise.resolve();
    });

program.command('add').action(add);
