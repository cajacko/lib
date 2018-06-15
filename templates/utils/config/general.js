const inquirer = require('inquirer');
const merge = require('lodash/merge');
const projectName = require('../projectName');
const { getOrigin } = require('../git');

const setProjectName = cb =>
  projectName.get().then(name => cb({ projectName: name }));

const defineConfigFromRepo = cb => () =>
  getOrigin().then((origin) => {
    if (!origin) return;
    if (!origin.includes('github.com')) return;

    const matches = /github\.com[:/](.*)\.git/.exec(origin);
    const repo = `https://github.com/${matches[1]}`;

    cb({
      homepage: `${repo}#readme`,
      bugs: {
        url: `${repo}/issues`,
      },
      repository: {
        type: 'git',
        url: `${repo}.git`,
      },
    });
  });

module.exports = () => {
  const config = {};

  const set = obj => merge(config, obj);

  return setProjectName(set)
    .then(defineConfigFromRepo(set))
    .then(() => config);
};

// version
// description
// keywords
// email (goes into bugs as well)
// license
// author = { name: '', email: '', url: '' }
// engines
// private
