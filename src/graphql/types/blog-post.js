import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

const blogPostType = new GraphQLObjectType({
    name: 'blogPost',
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
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
        content: { type: GraphQLString },
    }
});

export {blogPostType, blogPostInputType};