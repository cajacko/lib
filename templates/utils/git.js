const isGit = require('is-git-repository');

exports.getIsGitRepo = () => Promise.resolve(isGit());

// TODO:
exports.setupNewRepo = () => Promise.resolve();
