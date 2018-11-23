// @flow

const makeActionCreator = (type, ...argNames) => {
  if (argNames.length === 1 && typeof argNames[0] === 'function') {
    return (...args) => ({ type, payload: argNames[0](...args) });
  }

  return (...args) => {
    const payload = {};

    argNames.forEach((arg, index) => {
      payload[argNames[index]] = args[index];
    });

    return {
      type,
      payload,
    };
  };
};

export default makeActionCreator;
