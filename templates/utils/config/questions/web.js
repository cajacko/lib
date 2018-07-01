const inquirer = require('inquirer');

module.exports = () =>
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'prodSlug',
        message: 'Firebase production slug',
      },
      {
        type: 'input',
        name: 'devSlug',
        message: 'Firebase development slug',
      },
    ])
    .then(({ prodSlug, devSlug }) => ({
      firebaserc: { prod: prodSlug, dev: devSlug },
    }));
