const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

// Construct a Schema, using GraphQL schema language
const typeDefs = gql`
type Query {
    hello: String
}
`;

// Provide a resolver function for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello World!',
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app })

app.listen({ port:8000 }, () => 
console.log(`Server ready at http:localhost:8000${server.graphqlPath}`))