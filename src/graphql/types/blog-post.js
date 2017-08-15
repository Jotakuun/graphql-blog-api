import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

const blogPostType = new GraphQLObjectType({
    name: 'BlogPost',
    args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        type: { type: GraphQLString },
        category: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        content: { type: GraphQLString },
        // todo: implements comments
    }
});
const blogPostInputType = {};

export { blogPostType, blogPostInputType};