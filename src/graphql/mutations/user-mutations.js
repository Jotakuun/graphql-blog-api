import { GraphQLString } from 'graphql';
import bcrypt from 'bcrypt';

import { userType } from '../types/user';
import UserModel from '../../models/user-model';

let register = {
	type: userType,
	args: {
		username: {
			name: 'username',
			type: GraphQLString
		},
		email: {
			name: 'email',
			type: GraphQLString
		},
		password: {
			name: 'password',
			type: GraphQLString
		}
	},
	async resolve (root, params) {
		const user = params;
		user.password = await bcrypt.hash(user.password, 12);
		return UserModel.create(user);
	}
};

export default { register };