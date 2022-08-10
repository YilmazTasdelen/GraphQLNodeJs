const path = require('path');
const express = require('express');
//const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// check any directory or sub directory with file type .graphql
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));

/*
we use this over buildSchema now because 
makeExecutableSchema aproach benefit is that 
we  are able to split our schema to smaller parts.
*/
const schema = makeExecutableSchema({

    typeDefs: typesArray
})



const root = {
    products: require('./products/products.model'),
    orders: require('./orders/orders.model'),
};

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(3000, () => {
    console.log('Running GraphQL server...');
});