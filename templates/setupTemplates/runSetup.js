const Runner = require('./Runner');
const Projects = require('./templates/Projects');
const Eslint = require('./templates/Eslint');
const Flow = require('./templates/Flow');
const Jest = require('./templates/Jest');
const Cucumber = require('./templates/Cucumber');
const GitIgnore = require('./templates/GitIgnore');
const Readme = require('./templates/Readme');
const Env = require('./templates/Env');
const Prettier = require('./templates/Prettier');
const VSCode = require('./templates/VSCode');
const Travis = require('./templates/Travis');
const Privacy = require('./templates/Privacy');
const EditorConfig = require('./templates/EditorConfig');
const GitAttributes = require('./templates/GitAttributes');
const Changelog = require('./templates/Changelog');
const JSDocs = require('./templates/JSDocs');

module.exports = () => {
  const runner = new Runner({
    eslint: Eslint,
    env: Env,
    flow: Flow,
    jest: Jest,
    cucumber: Cucumber,
    gitignore: GitIgnore,
    readme: Readme,
    prettier: Prettier,
    vscode: VSCode,
    travis: Travis,
    privacy: Privacy,
    editorconfig: EditorConfig,
    gitattributes: GitAttributes,
    changelog: Changelog,
    jsdocs: JSDocs,
  });

  // eslint-disable-next-line
  new Projects(runner);

  return runner.run();
};
