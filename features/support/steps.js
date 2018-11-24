// features/support/steps.js
const { Given, When, Then } = require('cucumber');
const { join } = require('path');
const docker = require('./constants/docker');

Given('{string} is installed globally', packageName =>
  docker.run(`npm i -g ${packageName}`, 'template --help'));

Given('we create a directory at {string}', path => docker.run(`mkdir ${path}`));

Given('we change to the {string} directory', path => docker.cd(path));

Given('{string} is run with the {string} params', (command, template) =>
  docker
    .cp(
      join(__dirname, './constants/data/project.json'),
      '/project/project.json'
    )
    .then(() => docker.run(command)));

Given(
  'a local install of this repo {string} exists',
  string =>
    // Write code here that turns the phrase above into concrete actions
    'pending'
);

Given(
  'the {string} command in the local repo has been changed to {string}',
  (string, string2) =>
    // Write code here that turns the phrase above into concrete actions
    'pending'
);

When(
  '{string} env parameter is set to {string}',
  (string, string2) =>
    // Write code here that turns the phrase above into concrete actions
    'pending'
);

When(
  '{string} is run in the {string} directory',
  (string, string2) =>
    // Write code here that turns the phrase above into concrete actions
    'pending'
);

const runCount = (customCommand, number) => {
  console.log({ customCommand, number });

  return 'pending';
};

Then('{string} has been run {string} time', runCount);
Then('{string} has been run {string} times', runCount);

Then(
  'an error is thrown',
  () =>
    // Write code here that turns the phrase above into concrete actions
    'pending'
);
