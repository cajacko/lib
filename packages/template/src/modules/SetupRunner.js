// @flow

import {
  StepRunner,
  QueuedFileManagement,
  QueuedNPMManager,
} from '@cajacko/template-utils';
import { join } from 'path';
import setupTemplates from '../setup';
import selfConfig from '../../project.json';

/**
 * The setup runner class, that managers how all the setup templates
 * get triggered
 */
class SetupRunner extends StepRunner {
  /**
   * Initialise the class, define the initial props and set the steps to run
   *
   * @param {String} projectDir The project dir
   * @param {Object} projectConfig The project config
   * @param {String} lastTemplateVersion The version of the template lib to
   * install
   * @param {String} lastLibVersion The version of the lib to install
   *
   * @return {Void} No return value
   */
  constructor(projectDir, projectConfig, lastTemplateVersion, lastLibVersion) {
    const steps = [
      'preRun',
      'preSetupFiles',
      'setupFiles',
      'postSetupFiles',
      'preWriteFiles',
      'writeFiles',
      'postWriteFiles',
      'preInstallDependencies',
      'installDependencies',
      'postInstallDependencies',
      'postRun',
    ];

    super(steps);

    this.projectDir = projectDir;
    this.projectConfig = projectConfig || {};

    this.npm = new QueuedNPMManager(projectDir);

    this.isSelf = this.projectConfig.slug === selfConfig.slug;

    if (!this.isSelf && !this.projectConfig.ignoreTemplates) {
      this.addToStep('postWriteFiles', () =>
        this.npm.install({
          '@cajacko/lib': { version: lastLibVersion, exact: true },
        }));

      this.npm.add({
        '@cajacko/template': { version: lastTemplateVersion, exact: true },
      });
    }

    this.fs = new QueuedFileManagement(
      join(__dirname, '../../files'),
      projectDir
    );

    this.addInitialSteps();
    this.init();
  }

  /**
   * Add some initial funcs to trigger on specific steps
   * - Write the files that have been specified
   * - Install the dependencies
   *
   * @return {Void} No return value
   */
  addInitialSteps() {
    this.addToStep('writeFiles', this.fs.write);
    this.addToStep('installDependencies', this.npm.install);
  }

  /**
   * Run during the constructor. This Passes on this runner instance to each
   * setup template so it can add to the whole setup.
   *
   * @return {Void} No return value
   */
  init() {
    Object.keys(setupTemplates).forEach((setupTemplateKey) => {
      const SetupTemplate = setupTemplates[setupTemplateKey];

      const templatesUsed = this.projectConfig.templates
        ? Object.values(this.projectConfig.templates).map(({ type }) => type)
        : [];

      const setupTemplate = new SetupTemplate(this, {
        projectConfig: this.projectConfig,
        projectDir: this.projectDir,
        templatesUsed,
        isSelf: this.isSelf,
      });

      this.addAllMatchingMethodsToSteps(setupTemplate);

      this[setupTemplateKey] = setupTemplate;
    });
  }
}

export default SetupRunner;
