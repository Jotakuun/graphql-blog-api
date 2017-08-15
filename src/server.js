import express from 'express';
import graphqlHTTP from 'express-graphql';
import  {buildSchema}  from 'graphql';
import config from 'config';


// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
  hello: () => {
    return 'Hello world!';
  }
};

let app = express();
if (config.util.getEnv('NODE_ENV') !== 'production') {
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }))
}
app.listen(4000);
console.log('Running server at localhost:4000')