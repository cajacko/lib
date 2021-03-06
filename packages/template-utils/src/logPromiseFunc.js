// @flow

/**
 * Log the beginning and end of a promise func
 */
const logPromiseFunc = globalLog => (marker, opts) => callback => (...args) => {
  const { log } = opts || {};
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
