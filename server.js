const express = require('express');
//const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');


const { makeExecutableSchema } = require('@graphql-tools/schema');

const schemaText = `
type Query {
  products: [Product]
  orders: [Order]
}
type Product {
  id: ID!
  description: String!
  reviews: [Review]
  price: Float!
}
type Review {
  rating: Int!
  comment: String
}
type Order {
  date: String!
  subtotal: Float!
  items: [OrderItem]
}
type OrderItem {
  product: Product!
  quantity: Int!
}
`;
/*
we use this over buildSchema now because 
makeExecutableSchema aproach benefit is that 
we  are able to split our schema to smaller parts.
*/
const schema = makeExecutableSchema({

    typeDefs: [schemaText]
})



const root = {
    products: [
        {
            id: 'redshoe',
            description: 'Red Shoe',
            price: 42.12,
        },
        {
            id: 'bluejean',
            description: 'Blue Jeans',
            price: 55.55,
        }
    ],
    orders: [
        {
            date: '2005-05-05',
            subtotal: 90.22,
            items: [
                {
                    product: {
                        id: 'redshoe',
                        description: 'Old Red Shoe',
                        price: 45.11,
                    },
                    quantity: 2,
                }
            ]
        }
    ]
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