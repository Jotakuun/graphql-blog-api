import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLInt
} from 'graphql';

import { userType } from './user';
import UserModel from '../../models/user-model';
import { commentType } from './comment';
import CommentModel from '../../models/comment-model';

import getQueryFields from '../../utils/getQueryFields';
import paginationArgs from '../../utils/pagination';

const blogPostType = new GraphQLObjectType({
	name: 'blogPost',
	fields: {
		_id: { type: new GraphQLNonNull(GraphQLID) },
		author: { 
			type: userType,
			resolve: ({author}, params, context, info) => {
				let selection = getQueryFields(info);
				selection.join(' ');
				if (author) {
					return UserModel
						.findById(author)
						.select(selection)
						.exec();
				}
			}
		},        
		type: { type: GraphQLString },
		category: { type: GraphQLString },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		content: { type: GraphQLString },
		comments: { 
			type: new GraphQLList(commentType),
			args: paginationArgs,
			resolve: (blogPost, params, context, info) => {
				let selection = getQueryFields(info);
				const offset = params.offset ? params.offset : 0;
				const limit = params.limit ? params.limit : 0;
				return CommentModel
					.find({blogPostId: blogPost._id})
					.skip(offset)
					.limit(limit)
					.select(selection.join(' '))
					.exec();
			}
		}
	}
});

const blogPostInputType = new GraphQLInputObjectType({
	name: 'blogPostInput',
	fields: {
		category: { type: GraphQLString },
		type: { type: GraphQLString },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		content: { type: GraphQLString }
	}
});

export {blogPostType, blogPostInputType};