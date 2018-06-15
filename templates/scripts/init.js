const program = require('commander');
const inquirer = require('inquirer');
const { getIsGitRepo, setupNewRepo } = require('../utils/git');
const {
  getProjectConfig,
  isProjectConfigUpToDate,
  askAndSetProjectConfig,
  askForOutstandingProjectConfigAndSet,
} = require('../utils/projectConfig');
const deleteExistingFiles = require('../utils/deleteAllFiles');
const setProjectFiles = require('../utils/setProjectFiles');

const getShouldDeleteExistingFiles = () =>
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'shouldDelete',
        message: 'Do you want to delete all current files in this repo?',
      },
    ])
    .then(({ shouldDelete }) => shouldDelete);

const init = () => {
  getIsGitRepo()
    .then((isGitRepo) => {
      if (!isGitRepo) {
        console.log("Looks like you are not in a git repo, let's set one up. \nIf you want to run this for an existing project, cd into the project then run this command");
        return setupNewRepo().then(askAndSetProjectConfig);
      }

      return getProjectConfig().then((projectConfig) => {
        if (projectConfig) {
          return isProjectConfigUpToDate().then((projectConfigIsUpToDate) => {
            if (projectConfigIsUpToDate) return projectConfig;

            return askForOutstandingProjectConfigAndSet(projectConfig);
          });
        }

        return getShouldDeleteExistingFiles()
          .then((shouldDeleteExistingFiles) => {
            if (shouldDeleteExistingFiles) return deleteExistingFiles();
          })
          .then(askAndSetProjectConfig);
      });
    })
    .then(setProjectFiles);
};

program.command('init').action(init);
