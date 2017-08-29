import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

import {userType} from './user';
import UserModel from '../../models/user-model';

import getQueryFields from '../../utils/getQueryFields';

const blogPostType = new GraphQLObjectType({
    name: 'blogPost',
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
        type: { type: GraphQLString },
        category: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        content: { type: GraphQLString },
    }
});

const blogPostInputType = new GraphQLInputObjectType({
    name: 'blogPostInput',
    fields: {
        title: { type: GraphQLString },
        content: { type: GraphQLString }
    }
});

export {blogPostType, blogPostInputType};