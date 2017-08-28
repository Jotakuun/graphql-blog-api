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
async resolve (root, params, {user}) {
    if(user.isAdmin) {
        await BlogPostModel.create(params.data, (err, small) => {
            if (err) throw new Error('Error creating a blog post');
          });
        return true;
    } else {
        throw new Error('User is not allowed for creating a post');
        return false
    }
}
};

export default { createBlogPost };