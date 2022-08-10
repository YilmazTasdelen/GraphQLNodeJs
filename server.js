const path = require('path');
const express = require('express');
//const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// check any directory or sub directory with file type .graphql
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

/*
we use this over buildSchema now because 
makeExecutableSchema aproach benefit is that 
we  are able to split our schema to smaller parts.
*/
const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
})



const root = {
    products: require('./products/products.model'),
    orders: require('./orders/orders.model'),
};

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    //rootValue: root, //we dont need root after reorganize resolvers and get data from schema
    graphiql: true,
}));

app.listen(3000, () => {
    console.log('Running GraphQL server...');
});