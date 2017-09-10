import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';

import { commentType } from '../types/comment';
import CommentModel from '../../models/comment-model';

import getQueryFields from '../../utils/getQueryFields';
import paginationArgs from '../../utils/pagination';

let commentsFromBlogPost = {
	type: new GraphQLList(commentType),
	args: {
		blogPostId: { 
			name: 'blogPostId',
			type: new GraphQLNonNull(GraphQLID)
		},
		...paginationArgs
	},
	resolve (root, params, context, info) {
		let selection = getQueryFields(info);
		const offset = params.offset ? params.offset : 0;
		const limit = params.limit ? params.limit : 0;
		return CommentModel
			.find({blogPostId : params.blogPostId})
			.skip(offset)
			.limit(limit)
			.select(selection.join(' '))
			.exec();
	}
};
export default { commentsFromBlogPost };