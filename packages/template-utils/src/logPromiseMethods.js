// @flow

/**
 * Wrap each method in a class that returns a promise in a func that will log
 * when it starts, finishes and fails.
 *
 * Used to debug
 */
const logPromiseMethods = globalLog => (instance, { log } = {}) => {
  const actualLog = log || globalLog;

  Object.keys(instance).forEach((key) => {
    const prop = instance[key];

    if (typeof prop !== 'function') return;

    const orig = instance[key];

    // Have to do this
    // eslint-disable-next-line no-param-reassign
    instance[key] = (...args) => {
      const val = orig(...args);

      if (!val.then) {
        return val;
      }

      actualLog(`${key} - started`);

      return val
        .then((res) => {
          actualLog(`${key} - finished`);

          return res;
        })
        .catch((e) => {
          actualLog(`${key} - failed`);
          throw e;
        });
    };
  });
};

export default logPromiseMethods;
