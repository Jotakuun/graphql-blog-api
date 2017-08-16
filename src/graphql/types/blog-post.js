import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
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