// @flow

import { runCommand } from '@cajacko/template-utils';
import { join } from 'path';

/**
 * Build all the monorepo libs
 */
const buildLib = () =>
  runCommand('yarn run build', join(__dirname, '../../../../'));

export default buildLib;
