const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Define your type definitions (schema)
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Initialize Express
const app = express();

// Apply the Apollo GraphQL middleware to the Express server
server.start().then(() => {
  server.applyMiddleware({ app });

  // Define a basic route
  app.get('/', (req, res) => {
    res.send('Welcome to the Apollo Server with Express!');
  });

  // Start the server
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
