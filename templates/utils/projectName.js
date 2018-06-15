const projectDir = require('./projectDir');

let projectName;

const setProjectNameFromProjectDir = () =>
  projectDir.get().then((dir) => {
    const parts = dir.split('/');
    projectName = parts[parts.length - 1];
  });

setProjectNameFromProjectDir();

exports.setProjectNameFromProjectDir = setProjectNameFromProjectDir;

exports.get = () => Promise.resolve(projectName);

exports.set = (name) => {
  projectName = name;
};
