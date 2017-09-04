import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { Types } from 'mongoose';

import { commentType } from '../types/comment';
import CommentModel from '../../models/comment-model';

import getQueryFields from '../../utils/getQueryFields';

let commentsFromBlogPost = {
    type: new GraphQLList(commentType),
    args: {
        blogPostId: { 
            name: 'blogPostId',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, params, {user}, info) {
    let selection = getQueryFields(info);
    
    return CommentModel
      .find({blogPostId : params.blogPostId})
      .select(selection.join(' '))
      .exec();
    }
}
export default { commentsFromBlogPost };