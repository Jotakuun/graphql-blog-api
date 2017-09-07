import { GraphQLNonNull, GraphQLList, GraphQLID } from 'graphql';

import { blogPostType } from '../types/blog-post';
import BlogPostModel from '../../models/blog-post-model';

import getQueryFields from '../../utils/getQueryFields';

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
	args: {},
	resolve (root, params, context, info) {
		let selection = getQueryFields(info);
    
		return BlogPostModel
			.find({})
			.select(selection.join(' '))
			.exec();
	}
};
export default { blogPost, blogPosts };