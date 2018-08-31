// @flow

import Logger from '../../modules/Logger';

function logToServer(level, message, data) {
  let newLevel = level;

  if (level === 'error') newLevel = 'warn';

  console[newLevel]({
    level,
    message,
    data,
  });
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
