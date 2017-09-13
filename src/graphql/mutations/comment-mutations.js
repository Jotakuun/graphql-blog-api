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
			return await CommentModel.create({
				author: user.id,
				blogPostId: params.blogPostId,
				message: params.message,
				likes: 0
			}, (err) => {
				if (err) throw new Error(err);
			});
		} else {
			throw new Error(`User doesn't exist`);
		}
	}
};

let likeComment = {
	type: commentType,
	args: {
		commentId: {
			name: 'commentId',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve (root, params, {user}) {
		return new Promise( (resolve, reject ) => {
			const isUserValid = UserModel.findById(user.id);
			if (isUserValid) {
				return CommentModel.findById(params.commentId, (err, comment) => {
					if (err) reject(err);
					comment.likes = comment.likes + 1;
					comment.save((err, updated) => {
						if (err) reject(err);
						resolve(updated);
					});
				});
			} else {
				throw new Error(`User doesn't exist`);
			}
		});
	}
};

let dislikeComment = {
	type: commentType,
	args: {
		commentId: {
			name: 'commentId',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve (root, params, {user}) {
		return new Promise( (resolve, reject ) => {
			const isUserValid = UserModel.findById(user.id);
			if (isUserValid) {
				return CommentModel.findById(params.commentId, (err, comment) => {
					if (err) reject(err);
					comment.likes = comment.likes - 1;
					comment.save((err, updated) => {
						if (err) reject(err);
						resolve(updated);
					});
				});
			} else {
				throw new Error(`User doesn't exist`);
			}
		});
	}
};

let updateComment = {
	type: commentType,
	args: {
		commentId: {
			name: 'commentId',
			type: new GraphQLNonNull(GraphQLString)
		},
		message: {
			name: 'message',
			type:new GraphQLNonNull(GraphQLString)
		}
	},
	resolve (root, params, {user}) {
		return new Promise( (resolve, reject ) => {
			const loggedUser = UserModel.findById(user.id, (err, user) => user);
			return CommentModel.findById(params.commentId, (err, comment) => {
				if (err) reject(err);
				// todo: check if loggedUser === comment.author too
				if (user.isAdmin) {
					comment.message = params.message;
					comment.save((err, updated) => {
						if (err) reject(err);
						resolve(updated);
					});
				} else {
					reject('User is not allowed for update this message');
				}
			});

		});
	}
};

export default { comment, likeComment, dislikeComment, updateComment };
