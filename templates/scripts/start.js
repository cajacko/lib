const program = require('commander');
const inquirer = require('inquirer');
const add = require('../utils/add');
const { getProjectConfig } = require('../utils/project/projectConfig');
const startTemplate = require('../utils/startTemplate');

program.command('start [package]').action(temlplateArg =>
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
        return startTemplate(temlplateArg, templates[temlplateArg]);
      }

      console.log(`The template ${temlplateArg} does not exist in your project.json, let's add it!`);
      return add();
    }

    if (templateKeys.length === 1) {
      return startTemplate(templateKeys[0], templates[templateKeys[0]]);
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
      .then(({ template }) => startTemplate(template, templates[template]));
  }));
