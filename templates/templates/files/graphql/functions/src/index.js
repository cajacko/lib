const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const graphql = (request, response) => {
  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  const app = express();

  server.applyMiddleware({ app });

  // app.get('*', (req, res) => {
  //   res.send('Hello from Express on Firebase!');
  // });

  console.log(server.graphqlPath);

  return app(request, response);

  // app.listen({ port: 4000 }, () =>
  //   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
};

module.exports = graphql;
