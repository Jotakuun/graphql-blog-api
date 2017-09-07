import {
	GraphQLNonNull,
	GraphQLString
} from 'graphql';

import { commentType } from '../types/comment';
import CommentModel from '../../models/comment-model';
import UserModel from '../../models/user-model';

let comment = {
	type: commentType,
	args: {
		blogPostId: {
			name: 'blogPostId',
			type: new GraphQLNonNull(GraphQLString)
		},
		message: {
			name: 'message',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	async resolve (root, params, {user}) {
		const isUserValid = await UserModel.findById(user.id);
		if (isUserValid) {
			await CommentModel.create({
				author: user.id,
				blogPostId: params.blogPostId,
				message: params.message}, (err, createdComment) => {
				if (err) throw new Error(err);
				return createdComment;
			});
		} else {
			throw new Error(`User doesn't exist`);
		}
	}
};

export default { comment };
