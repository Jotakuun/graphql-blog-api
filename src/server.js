import express from 'express';
import graphqlHTTP from 'express-graphql';
import  {buildSchema}  from 'graphql';
import config from 'config';
import mongoose from 'mongoose';

import schema from './graphql';
import BlogPostModel from './models/blog-post-model';

let DBHost = config.get('DBHost')
mongoose.connect(DBHost, { useMongoClient: true });

let app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  pretty: true,
  graphiql: config.util.getEnv('NODE_ENV') !== 'production',
}))

app.listen(4000);
console.log('Running server at localhost:4000')