// @flow
/* eslint no-console: 0 */

import chalk from 'chalk';

/**
 * Logger class for helping us log everywhere we need to
 */
export class Logger {
  /**
   * Initialise the class, set all the log levels and wrap the console
   * so we can manipulate it a
   * little
   *
   * @return {Void} No return value
   */
  constructor() {
    this.levels = {
      debug: { color: chalk.gray, consoleFunc: console.log },
      log: { color: chalk.green, consoleFunc: console.log },
      warn: { color: chalk.yellow, consoleFunc: console.warn },
      error: { color: chalk.red, consoleFunc: console.error },
    };

    this.levels.info = this.levels.log;

    this._console = this._console.bind(this);

    const transports = [this._console];

    Object.keys(this.levels).forEach((level) => {
      this[level] = (message, data, options) => {
        transports.forEach((transport) => {
          transport(level, message, data, options);
        });
      };
    });
  }

  /**
   * Log at regular intervals, returns a func to call to clear the interval.
   * This writes to the same line
   *
   * @param {String} level The log level to log at
   * @param {Function} getMessage A function that gets the message and data
   * to log
   * @param {Object} [options] Any additional options
   *
   * @return {Function} Func that clears the interval
   */
  update(level, getMessage, options = {}) {
    let i = 0;

    const interval = setInterval(() => {
      if (i === 0) process.stdout.write('\n');

      const response = getMessage(i);

      let message = response;
      let data;

      if (typeof response === 'object') {
        ({ message, data } = response);
      }

      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      this._console(level, message, data, { stdout: true, ...options });
      i += 1;
    }, options.interval || 500);

    return () => {
      clearInterval(interval);
    };
  }

  /**
   * Log to the console
   *
   * @param {String} level The level to log at
   * @param {Any} message Normally the string message, could be an error
   * instance
   * @param {Any} [data] Any additional info to pass
   * @param {Object} [options] Additional options to control behaviour
   *
   * @return {Void} No return value
   */
  _console(level, message, data, options) {
    if (message === undefined && data === undefined) return;

    const { consoleFunc, color } = this.levels[level];

    let finalMessage = message;
    let finalData = data;

    if (message instanceof Error) {
      finalMessage = message.stack;
    } else if (typeof message === 'object') {
      finalMessage = 'Data';
      finalData = data === undefined ? message : [message, data];
    }

    const formattedMessage = color(`@CJ ${finalMessage}`);

    if (options && options.stdout) {
      process.stdout.write(formattedMessage);
      if (finalData !== undefined) consoleFunc(finalData);
    } else {
      const args = [formattedMessage];
      if (finalData !== undefined) args.push(finalData);
      consoleFunc(...args);
    }
  }
}

const logger = new Logger();

export default logger;
