// @flow

import {
  getProjectDir,
  getProjectConfig,
  logger,
  ask,
} from '@cajacko/template-utils';
import { copy } from 'fs-extra';
import { join } from 'path';
import SetupRunner from '../modules/SetupRunner';

const questions = [
  'Do you have branch permission setup correctly in GitHub',
  'Have you setup travis for this project?',
  "Is travis configured to only run on PR's",
];

/**
 * Initialise the project
 *
 * @return {Promise} Resolves when the initialisation has finished
 */
const init = () =>
  ask(questions.map((message, i) => ({
    type: 'confirm',
    name: `qs-${i}`,
    message,
  }))).then(() =>
    Promise.all([getProjectDir(), getProjectConfig()]).then((responses) => {
      const [projectDir, projectConfig] = responses;

      if (!projectConfig) {
        logger.log('No project.json found in the project dir. Creating one now.');

        return copy(
          join(__dirname, '../../files/example/project.json'),
          join(projectDir, 'project.json')
        ).then(() => {
          logger.log('Created project.json. Please check it is accurate before running "init" again');
        });
      }

      const setupRunner = new SetupRunner(projectDir, projectConfig);

      return setupRunner.runSteps();
    }));

export default init;
