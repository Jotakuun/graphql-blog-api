import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import {Types} from 'mongoose';

import blogPostType from '../types/blog-post';
import BlogPostModel from '../../models/blog-post-model';
console.log('blogposttype')
console.log(blogPostType)

let blogPost = {
    type: blogPostType,
    args: {
        id: { 
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, params, options) {

    return BlogPostModel
      .findById(params.id)
      .exec();
    }
}
export default { blogPost };