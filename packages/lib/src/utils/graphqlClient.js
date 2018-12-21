// @flow

import { request } from 'graphql-request';

type Methods = {
  [string]: (
    *
  ) => { mutation?: string, query?: string, vars?: { [string]: * } },
};

/**
 * Creates the graphql client. So the client can make graphql requests.
 */
const graphqlClient = (
  methods: Methods,
  endpoint: string,
  timeout?: ?number = 20000
) => {
  const client = {
    /**
     * Can define a custom timeout, this returns a new instance of the
     * graphql client, with every method using the new timeout
     */
    _setTimeout: (newTimeout: ?number) =>
      graphqlClient(methods, endpoint, newTimeout),
  };

  Object.keys(methods).forEach((methodKey) => {
    const method = methods[methodKey];

    client[methodKey] = (...args) => {
      const { mutation, query, vars } = method(...args);

      const queryReq = query || mutation;

      return new Promise((resolve, reject) => {
        if (typeof timeout === 'number') {
          setTimeout(() => {
            const error = new Error(`API call timed out after ${String(timeout)}ms`);
            error.timeout = true;
            reject(error);
          }, timeout);
        }

        request(endpoint, queryReq, vars)
          .then((data) => {
            const keys = Object.keys(data);

            if (keys.length === 1) return resolve(data[keys[0]]);

            resolve(data);
          })
          .catch(reject);
      });
    };
  });

  return client;
};

export default graphqlClient;
