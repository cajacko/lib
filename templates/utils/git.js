const isGit = require('is-git-repository');
const inquirer = require('inquirer');
const { pathExists, ensureDir } = require('fs-extra');
const { join } = require('path');
const simpleGit = require('simple-git');
const getProjectDir = require('./getProjectDir');
const {
  getDoesRepoExist,
  createRepoAndClone,
  getCanConnectToGithub,
  setupGitHubConnection,
} = require('./github');

const createLocalRepo = (name, parentDir) => {
  const projectDir = join(parentDir, name);
  return ensureDir(projectDir).then(() => simpleGit(projectDir).init());
};

const askToResortToLocal = (name, parentDir, message) =>
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'shouldContinue',
        message,
      },
    ])
    .then(({ shouldContinue }) => {
      if (shouldContinue) return createLocalRepo(name, parentDir);

      return Promise.resolve();
    });

const createAndCloneRepoOrResortToLocal = (name, parentDir) =>
  getDoesRepoExist(name).then((repoExists) => {
    if (!repoExists) return createRepoAndClone(name, parentDir);

    return askToResortToLocal(
      name,
      parentDir,
      `The repo "${name}" already exists for the GitHub user. Do you want to create this project as a local only repo?`,
    );
  });

exports.getIsGitRepo = () => Promise.resolve(isGit());

exports.setupNewRepo = () =>
  getProjectDir()
    .then(projectDir =>
      inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Repo name',
          validate: (name) => {
            if (!name.match(/^[a-z][a-z\-]*[a-z]$/)) {
              return 'The repo name must be in a url slug like format e.g. repo-name';
            }

            return true;
          },
        },
        {
          type: 'input',
          name: 'parentDir',
          message:
            "Where do you want to create this project (don't include the project name)",
          default: projectDir,
          validate: parentDir => pathExists(parentDir),
        },
        {
          type: 'confirm',
          name: 'shouldAddToGitHub',
          message: 'Do you want to add this as a new repo to GitHub?',
        },
      ]))
    .then(({ name, shouldAddToGitHub, parentDir }) => {
      if (!shouldAddToGitHub) return createLocalRepo(name, parentDir);

      return getCanConnectToGithub().then((canConnectToGitHub) => {
        if (canConnectToGitHub) {
          return createAndCloneRepoOrResortToLocal(name, parentDir);
        }

        return setupGitHubConnection().then((connectedToGitHub) => {
          if (connectedToGitHub) {
            return createAndCloneRepoOrResortToLocal(name, parentDir);
          }

          return askToResortToLocal(
            name,
            parentDir,
            'Could not establish a connection to GitHub. Do you want to create this project as a local only repo?',
          );
        });
      });
    });
