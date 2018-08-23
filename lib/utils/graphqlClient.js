// @flow

const graphqlClient = (config) => {
  const client = {};

  Object.keys(config).forEach((configKey) => {
    const wrappedMethods = {};

    const methods = config[configKey];

    Object.keys(methods).forEach((methodKey) => {
      const method = methods[methodKey];

      wrappedMethods[methodKey] = (...args) => {
        const { mutation, query, vars } = method(...args);

        // TODO: Let's wrap the mutation or query in apollo
      };
    });

    client[configKey] = wrappedMethods;
  });

  return client;
};

export default graphqlClient;
