"use strict";
const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql `
  type Query {
    hello: String!
  }
`;
const resolvers = {
    Query: {
        hello: () => {
            return "Hello World";
        }
    }
};
const server = new ApolloServer({ typeDefs, resolvers, introspection: true,
    playground: false, });
server.listen().then(({ url }) => {
    console.log("url:" + url);
});
