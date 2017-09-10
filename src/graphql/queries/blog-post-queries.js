import { GraphQLNonNull, GraphQLList, GraphQLID } from 'graphql';

import { blogPostType } from '../types/blog-post';
import BlogPostModel from '../../models/blog-post-model';

import getQueryFields from '../../utils/getQueryFields';
import paginationArgs from '../../utils/pagination';

let blogPost = {
	type: blogPostType,
	args: {
		id: { 
			name: 'id',
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	resolve (root, params, context, info) {
		let selection = getQueryFields(info);
		return BlogPostModel
			.findById(params.id)
			.select(selection.join(' '))
			.exec();
	}
};

let blogPosts = {
	type: new GraphQLList(blogPostType),
	args: paginationArgs,
	resolve (root, params, context, info) {
		let selection = getQueryFields(info);
		const offset = params.offset ? params.offset : 0;
		const limit = params.limit ? params.limit : 0;
    
		return BlogPostModel
			.find({})
			.skip(offset)
			.limit(limit)
			.select(selection.join(' '))
			.exec();
	}
};
export default { blogPost, blogPosts };