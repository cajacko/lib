const Runner = require('./Runner');
const Eslint = require('./Eslint');
const Env = require('./Env');
const SetProject = require('./SetProject');

const runner = new Runner({
  eslint: Eslint,
  env: Env,
});

runner.add('preRun', () => new SetProject(runner));

runner.run();
