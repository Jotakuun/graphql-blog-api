import {
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLString
} from 'graphql';

import { blogPostType, blogPostInputType } from '../types/blog-post';
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
    if (user.isAdmin) {
        await BlogPostModel.create({...params.data, author: user.id}, (err, small) => {
            if (err) throw new Error('Error creating a blog post');
          });
        return true;
    } else {
        throw new Error('User is not allowed for creating a post');
        return false
    }
}
};

let updateBlogPost = {
type: blogPostType,
args: {
    id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLString)
    },
    data: {
        name: 'data',
        type: new GraphQLNonNull(blogPostInputType)
    }
},
resolve (root, params, { user }) {
    if (user.isAdmin) {
        BlogPostModel.findByIdAndUpdate(params.id, { $set: params.data}, { new: true }, (err, updatedPost) => {
            if (err) throw new Error(err);
            return updatedPost;
          });
    } else {
        throw new Error('Unathorize. User is not allowed for updating a post');
    }
}
};

let deleteBlogPost = {
type: GraphQLBoolean,
args: {
    id: {
    name: 'id',
    type: new GraphQLNonNull(GraphQLString)
    }
},
async resolve (root, params, {user}) {
    if(user.isAdmin) {
        BlogPostModel.findByIdAndRemove(params.id, (err) => {
            if (err) throw new Error(err);
            return true;
          });
    } else {
        throw new Error('User is not allowed for deleting posts');
    }
}
};

export default { createBlogPost, updateBlogPost, deleteBlogPost };
