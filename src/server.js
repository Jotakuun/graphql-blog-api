import express from 'express';
import graphqlHTTP from 'express-graphql';
import config from 'config';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import schema from './graphql';

const API_SECRET = config.get('API_SECRET');
const DBHost = config.get('DBHost');
mongoose.connect(DBHost, { useMongoClient: true });

const app = express();

const getUser = async (req) => {
	const token = req.headers.authorization;
	try {
		if (token) {
			let decoded = await jwt.verify(token, API_SECRET);
			req.user = decoded.user;
		}
	} catch (err) {
		console.log('user not authenticated');
	}
	req.next();
};

app.use(getUser);

app.use('/graphql', graphqlHTTP((req) => ({
	schema: schema,
	pretty: true,
	graphiql: config.util.getEnv('NODE_ENV') !== 'production',
	context: {
		secret: API_SECRET,
		user: req.user
	}
})
));

app.listen(4000);
console.log('Running server at localhost:4000');