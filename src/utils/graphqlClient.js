// @flow

import { request } from 'graphql-request';

const graphqlClient = (methods, endpoint) => {
  const client = {};

  Object.keys(methods).forEach((methodKey) => {
    const method = methods[methodKey];

    client[methodKey] = (...args) => {
      const { mutation, query, vars } = method(...args);

      const queryReq = query || mutation;

      return request(endpoint, queryReq, vars).then((data) => {
        const keys = Object.keys(data);

        if (keys.length === 1) return data[keys[0]];

        return data;
      });
    };
  });

  return client;
};

export default graphqlClient;
