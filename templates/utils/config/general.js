const inquirer = require('inquirer');
const projectName = require('../projectName');

module.exports = () => {
  const config = {};

  return projectName
    .get()
    .then((name) => {
      config.projectName = name;
    })
    .then(() => config);
};
