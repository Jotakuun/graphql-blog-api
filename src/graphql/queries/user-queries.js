import { GraphQLString } from 'graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../../models/user-model';

let login = {
	type: GraphQLString,
	args: {
		username: { 
			name: 'username',
			type: GraphQLString
		},
		password: { 
			name: 'password',
			type: GraphQLString
		}
	},
	async resolve (root, {username, password}, {secret}) {
		const user = await UserModel.findOne({ username: username }, '_id username password admin');
		if (!user) {
			throw new Error(`There isn't any user matching that username`);
		}

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error('Incorrect password');
		}

		const token = jwt.sign(
			{
				user: {
					id: user._id,
					username: user.username,
					isAdmin: user.admin
				}
			},
			secret,
			{ expiresIn: '1h' },
		);
  
		return token;
	}
};
export default { login };