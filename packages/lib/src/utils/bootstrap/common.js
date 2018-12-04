// @flow

// Bootstrap file to be loaded inside a project template, after the config entry file has loaded.

import marketingCopy from '../marketingCopy';
import AppError from '../../modules/AppError';
import logger from '../../utils/logger';

global.logger = logger;
marketingCopy.setErrorClass(AppError);
