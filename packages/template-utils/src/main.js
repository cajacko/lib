// @flow

import runCommand, { killAll as killAllCommands } from './runCommand';
import getShouldUpdatePackage from './getShouldUpdatePackage';
import * as git from './git';
import logger from './logger';
import StepRunner from './modules/StepRunner';
import QueuedFileManagement from './modules/QueuedFileManagement';
import QueuedNPMManager from './modules/QueuedNPMManager';
import orderObj from './orderObj';
import copyTmpl from './copyTmpl';
import copyDependencies from './copyDependencies';
import copyAndWatch from './copyAndWatch';
import ask from './ask';
import isSymLink from './conditionals/isSymLink';
import replaceInFile from './replaceInFile';
import resizeImageAndCopyTo from './resizeImageAndCopyTo';
import CertStorage from './modules/CertStorage';
import Settings from './modules/Settings';

export { parseEnvFromJSON } from './env';
export { setPackageVersion, askForNewPackageVersion } from './packageVersion';
export { registerCommand, processCommands } from './commands';
export { getProjectDir, getProjectConfig, getProjectEnv } from './project';

export {
  Settings,
  CertStorage,
  resizeImageAndCopyTo,
  replaceInFile,
  isSymLink,
  killAllCommands,
  ask,
  copyAndWatch,
  copyDependencies,
  copyTmpl,
  getShouldUpdatePackage,
  git,
  logger,
  orderObj,
  QueuedFileManagement,
  QueuedNPMManager,
  runCommand,
  StepRunner,
};
