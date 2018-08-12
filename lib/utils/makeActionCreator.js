// @flow

const makeActionCreator = (type, ...argNames) =>
  function (...args) {
    const payload = {};

    argNames.forEach((arg, index) => {
      payload[argNames[index]] = args[index];
    });

    return {
      type,
      payload,
    };
  };

export default makeActionCreator;
