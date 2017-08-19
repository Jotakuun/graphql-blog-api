import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import {Types} from 'mongoose';

import blogPostType from '../types/blog-post';
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
}
export default { blogPost };