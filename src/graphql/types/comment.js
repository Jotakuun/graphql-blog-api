import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLID,
	GraphQLInt 
} from 'graphql';

import { userType } from './user';
import UserModel from '../../models/user-model';

import getQueryFields from '../../utils/getQueryFields';
  
const commentType = new GraphQLObjectType({
	name: 'comment',
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
		blogPostId: { type: new GraphQLNonNull(GraphQLID) },
		message: { type: GraphQLString },
		likes: { type: GraphQLInt }
	}
});

const commentInputType = new GraphQLInputObjectType({
	name: 'commentInput',
	fields: {
		author: { type: new GraphQLNonNull(GraphQLID) },
		blogPostId: { type: new GraphQLNonNull(GraphQLID) },
		message: { type: GraphQLString }
	}
});
  
export { commentType, commentInputType };