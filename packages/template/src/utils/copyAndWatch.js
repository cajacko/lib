// @flow

import {
  copyAndWatch as UCopyAndWatch,
  runCommand,
  logger,
} from '@cajacko/template-utils';
import { copy as UCopy } from 'fs-extra';
import { join } from 'path';

/**
 * Get the babel command
 */
const getCommand = (src, dest) =>
  `yarn babel ${src} --out-dir ${dest} --presets=react,env,flow --plugins=transform-class-properties,transform-react-jsx-source,transform-object-rest-spread,styled-components`;

/**
 * Copy the src to dest, optionally transpiling it
 */
export const copy = (src, dest, optionsArg = {}) => {
  const { transpile, ...options } = optionsArg;

  if (transpile) {
    const command = getCommand(src, dest);
    const path = join(__dirname, '../../');

    return runCommand(command, path, { noLog: true });
  }

  return UCopy(src, dest, options);
};

/**
 * Copy a src directory to a destination, passing it through the babel
 * transpiler. And then watch for changes.
 */
const copyAndWatch = (src, dest, optionsArg = {}) => {
  const { transpile, ...options } = optionsArg;

  if (transpile) {
    const command = getCommand(src, dest);
    const path = join(__dirname, '../../');

    return runCommand(command, path, { noLog: true }).then(() => {
      runCommand(`${command} --watch --skip-initial-build`, path).catch(() => {
        if (options.exitOnError) {
          logger.error(`Watch failed between "${src}" and "${dest}"`);
          process.exit(1);
        }
      });
    });
  }

  return UCopyAndWatch(src, dest, options);
};

export default copyAndWatch;
