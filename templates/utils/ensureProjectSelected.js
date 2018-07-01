const inquirer = require('inquirer');
const add = require('../utils/config/add');
const { getProjectConfig } = require('../utils/project/projectConfig');

module.exports = temlplateArg =>
  getProjectConfig().then(({ templates }) => {
    const noTemplates = () => {
      console.log("Looks like you have no templates in your project.json, let's add one");

      return add();
    };

    if (!templates) return noTemplates();

    const templateKeys = Object.keys(templates);

    if (!templateKeys.length) return noTemplates();

    if (temlplateArg) {
      if (templates[temlplateArg]) {
        return Promise.resolve({
          key: temlplateArg,
          config: templates[temlplateArg],
        });
      }

      console.log(`The template ${temlplateArg} does not exist in your project.json, let's add it!`);
      return add();
    }

    if (templateKeys.length === 1) {
      return Promise.resolve({
        key: templateKeys[0],
        config: templates[templateKeys[0]],
      });
    }

    return inquirer
      .prompt([
        {
          name: 'template',
          type: 'list',
          message: 'Choose which tempalte you want to start',
          choices: templateKeys,
        },
      ])
      .then(({ template }) =>
        Promise.resolve({ key: template, config: templates[template] }));
  });
