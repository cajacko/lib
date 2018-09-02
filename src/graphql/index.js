const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const db = require('./db');

const graphql = config => (request, response) => {
  let typeDefs = '';
  let queries = '';
  let mutations = '';
  let queryResolvers = {};
  let mutationResolvers = {};

  if (config.typeDefs) {
    Object.values(config.typeDefs).forEach(({ types, query, mutation }) => {
      if (types) {
        typeDefs = `
          ${typeDefs}
          ${types}
        `;
      }

      if (query) {
        queries = `
          ${queries}
          ${query}
        `;
      }

      if (mutation) {
        mutations = `
          ${mutations}
          ${mutation}
        `;
      }
    });
  }

  if (config.resolvers) {
    Object.values(config.resolvers).forEach(({ Query, Mutation }) => {
      if (Query) {
        queryResolvers = { ...Query, ...queryResolvers };

        Object.keys(Query).forEach((query) => {
          const resolver = Query[query];

          queryResolvers[query] = (obj, args) => resolver(args, db);
        });
      }

      if (Mutation) {
        mutationResolvers = { ...Mutation, ...mutationResolvers };

        Object.keys(Mutation).forEach((mutation) => {
          const resolver = Mutation[mutation];

          mutationResolvers[mutation] = (obj, args) => resolver(args, db);
        });
      }
    });
  }

  if (queries !== '') {
    typeDefs = `
      ${typeDefs}

      type Query {
        ${queries}
      }
    `;
  }

  if (mutations !== '') {
    typeDefs = `
      ${typeDefs}

      type Mutation {
        ${mutations}
      }
    `;
  }

  const apolloOptions = {
    typeDefs: gql`
      ${typeDefs}
    `,
    resolvers: {},
  };

  if (Object.keys(mutationResolvers).length) {
    apolloOptions.resolvers.Mutation = mutationResolvers;
  }

  if (Object.keys(queryResolvers).length) {
    apolloOptions.resolvers.Query = queryResolvers;
  }

  const server = new ApolloServer(apolloOptions);

  const app = express();

  server.applyMiddleware({ app });

  return app(request, response);
};

module.exports = graphql;
