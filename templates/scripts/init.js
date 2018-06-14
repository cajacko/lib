const program = require('commander');
const { getIsGitRepo, setupNewRepo } = require('../utils/git');
const {
  getProjectConfig,
  isProjectConfigUpToDate,
  askAndSetProjectConfig,
  askForOutstandingProjectConfigAndSet,
} = require('../utils/projectConfig');
const deleteExistingFiles = require('../utils/deleteAllFiles');
const setProjectFiles = require('../utils/setProjectFiles');

const getShouldDeleteExistingFiles = () => {};

const init = () => {
  getIsGitRepo()
    .then((isGitRepo) => {
      if (!isGitRepo) return setupNewRepo().then(askAndSetProjectConfig);

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
