
// DEPENDENCIES: 
// - apollo-server-express
// - graphql-tools
// - graphql
// - express
// - body-parser


// import express
const express = require('express')
// import body-parser
const bodyParser = require('body-parser')
// import what is needed from apollo
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
// graphql-tools
const { makeExecutableSchema } = require('graphql-tools')

// some fake data
const books = [
    {
        title: "Harry Potter and the Sorcerer's stone",
        author: "J.K. Rowling",
    },
    {
        title: "Jurassic Park",
        author: "Michael Crichton",
    },
]

// The GraphQL Schema in string form
const typeDefs = `
    type Query { books: [Book]}

    type Book { 
        title: String,
        author: String
        }
`;
// *** end GraphQL Schema ***

// Resolver Functions
const resolvers = {
    Query: { books: () => books },
};

// Bind typeDefs to the resolvers to create the GraphQL Schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

// Initialize Express Server
const server = express()

// Make GraphQL endpoints
server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

// GraphiQL - a visual editor for queries
server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// Start the Server
server.listen(8000, () => {
    console.log('Go to http://localhost:8000/graphiql to run queries.')
})