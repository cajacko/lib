const octokit = require('@octokit/rest')();
const inquirer = require('inquirer');
const simpleGit = require('simple-git');
const { ensureDir } = require('fs-extra');
const { join } = require('path');
const settings = require('./settings');
const projectDir = require('./projectDir');

const getCanConnectToGithub = (username, token) => {
  const gitHubToken = token || settings.get('gitHubToken');
  const gitHubUsername = username || settings.get('gitHubUsername');

  if (!gitHubToken) return Promise.resolve(false);
  if (!gitHubUsername) return Promise.resolve(false);

  octokit.authenticate({
    type: 'token',
    token: gitHubToken,
  });

  return octokit.users
    .getKeysForUser({ username: gitHubUsername })
    .then(() => true)
    .catch(() => false);
};

exports.getCanConnectToGithub = getCanConnectToGithub;

exports.setupGitHubConnection = () => {
  console.log("You are not connected to GitHub, let's add your details");

  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'gitHubUsername',
        message: 'Enter your gitHub username',
      },
      {
        type: 'input',
        name: 'gitHubToken',
        message: 'Enter your gitHub api token',
      },
    ])
    .then(({ gitHubUsername, gitHubToken }) => {
      settings.set('gitHubToken', gitHubToken);
      settings.set('gitHubUsername', gitHubUsername);

      return getCanConnectToGithub(gitHubUsername, gitHubToken);
    });
};

exports.getDoesRepoExist = (name) => {
  const gitHubUsername = settings.get('gitHubUsername');

  return octokit.repos
    .get({ owner: gitHubUsername, repo: name })
    .then(() => true)
    .catch(() => false);
};

const createRepo = name =>
  octokit.repos.create({ name }).then(repo => repo.data.ssh_url);

const cloneRepo = (url, dir) =>
  ensureDir(dir)
    .then(() => simpleGit().clone(url, dir))
    .then(() => {
      projectDir.set(dir);
      console.log(`Cloned repo to: ${dir}`);
    });

exports.createRepoAndClone = (name, parentDir) =>
  createRepo(name).then((url) => {
    const dir = join(parentDir, name);

    return cloneRepo(url, dir);
  });
