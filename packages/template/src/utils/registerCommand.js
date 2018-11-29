// @flow

import {
  registerCommand as UtilsRegisterCommand,
  getProjectConfig,
  getProjectEnv,
  getProjectDir,
  killAllCommands,
  logger,
} from '@cajacko/template-utils';

/**
 * Finish the script, if an error is supplied will exit with an error status
 * code
 *
 * @param {Error} e Optional error
 *
 * @return {Void} No return value
 */
const finish = (e) => {
  killAllCommands();

  if (e) {
    if (e instanceof Error) {
      logger.error(e);
    }

    process.exit(1);
  }

  process.exit(0);
};

/**
 * Register a command that can be used via cli. Pass in the callback and some
 * optional options.
 *
 * @param {String} command The command to register
 * @param {Function} callback The function to run when the command is called
 * @param {Object} [configArg] Options for registering the command
 *
 * @return {Object} The commander instance
 */
const registerCommand = (command, callback, configArg) => {
  const config = typeof configArg === 'object' ? configArg : { options: [] };
  const options = config.options || [];

  return UtilsRegisterCommand(
    command,
    (...registerArgs) =>
      Promise.all([getProjectConfig(), getProjectEnv(), getProjectDir()])
        .then(([projectConfig, env]) =>
          callback(...registerArgs, projectConfig, env))
        .then(() => finish()),
    { options },
    finish
  );
};

export default registerCommand;
