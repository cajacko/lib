// @flow

import Logger from '../../modules/Logger';

/**
 * Do something with the log
 */
function logToServer(level, message, data) {
  let newLevel = level;

  if (level === 'error') newLevel = 'warn';

  // This is the only time it's ok to console
  // eslint-disable-next-line no-console
  const log = console[newLevel] || console.log;

  log(message, data);
}

const logLevels = {
  debug: 'debug',
  log: 'info',
  info: 'info',
  warn: 'warning',
  error: 'error',
};

const logger = new Logger(logToServer, logLevels);

export const loggerInstance = logger;

export default logger.getLogger();
