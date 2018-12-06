// @flow

/**
 * Log the beginning and end of a promise func
 */
const logPromiseFunc = globalLog => (marker, { log } = {}) => callback => (...args) => {
  const actualLog = log || globalLog;

  actualLog(`${marker} - started`);

  return callback(...args)
    .then((res) => {
      actualLog(`${marker} - finished`);

      return res;
    })
    .catch((e) => {
      actualLog(`${marker} - failed`);
      throw e;
    });
};

export default logPromiseFunc;
