// @flow

import promiseQueue from '../promiseQueue';
import runCommand from '../runCommand';

/**
 * Let's you manage install npm dependencies. You can keep adding packages, and
 * then install them all in 1 call to install();
 */
class QueuedNPMManager {
  /**
   * Initialise the class, set the class props and bind the public methods
   *
   * @param {String} destPath The destination to run npm install in
   *
   * @return {Void} No return value
   */
  constructor(destPath) {
    this.nodeModules = {};
    this.destPath = destPath;

    this.add = this.add.bind(this);
    this.install = this.install.bind(this);
  }

  /**
   * Install all the specified node modules
   *
   * @param {Object} [nodeModules] The npm modules to install, defaults to
   * this.nodeModules
   *
   * @return {Promise} Resolves when all the packages have been installed
   */
  install(nodeModules = this.nodeModules) {
    const nodeModulesCommands = {};

    Object.keys(nodeModules).forEach((key) => {
      const {
        type, version, isGitURl, exact,
      } = nodeModules[key];
      const finalType = type || 'dependency';

      if (!nodeModulesCommands[finalType]) nodeModulesCommands[finalType] = '';

      let packageWithVersion = isGitURl ? key : `${key}@${version}`;

      if (exact) packageWithVersion = `${packageWithVersion} --exact`;

      nodeModulesCommands[finalType] = `${
        nodeModulesCommands[finalType]
      } ${packageWithVersion}`;
    });

    const promises = [];

    Object.keys(nodeModulesCommands).forEach((key) => {
      let command = 'yarn add';

      if (key !== 'dependency') command = `${command} --${key}`;

      command = `${command} ${nodeModulesCommands[key]}`;

      promises.push(() => runCommand(command, this.destPath, { noLog: true }));
    });

    return promiseQueue(promises);
  }

  /**
   * Add some packages to be installed
   *
   * @param {Object} nodeModules The packages to add
   *
   * @return {Void} No return value
   */
  add(nodeModules) {
    this.nodeModules = { ...nodeModules, ...this.nodeModules };
  }
}

export default QueuedNPMManager;
