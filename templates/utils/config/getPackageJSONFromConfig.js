const merge = require('lodash/merge');

module.exports = ({ githubRepo }) => {
  const packageJSON = {};

  if (githubRepo) {
    merge(packageJSON, {
      homepage: `${githubRepo}#readme`,
      bugs: {
        url: `${githubRepo}/issues`,
      },
      repository: {
        type: 'git',
        url: `${githubRepo}.git`,
      },
    });
  }

  // engines
};
