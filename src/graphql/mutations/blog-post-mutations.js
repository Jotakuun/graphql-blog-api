import {
    GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';

import {blogPostInputType} from '../types/blog-post';
import BlogPostModel from '../../models/blog-post-model';

let createBlogPost = {
type: GraphQLBoolean,
args: {
    data: {
    name: 'data',
    type: new GraphQLNonNull(blogPostInputType)
    }
},
async resolve (root, params) {
    await BlogPostModel.create(params.data, (err, small) => {
        if (err) throw new Error('Error creating a blog post');
      });
    return true;
}
};

export default { createBlogPost };