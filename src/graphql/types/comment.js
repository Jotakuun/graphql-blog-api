import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLInt 
  } from 'graphql';
  
  const commentType = new GraphQLObjectType({
      name: 'comment',
      fields: {
          _id: { type: new GraphQLNonNull(GraphQLID) },
          author: { type: new GraphQLNonNull(GraphQLString) },
          blogPostId: { type: new GraphQLNonNull(GraphQLString) },
          message: { type: GraphQLString },
          likes: { type: GraphQLInt }
      }
  });

  const commentInputType = new GraphQLInputObjectType({
    name: 'commentInput',
    fields: {
        author: { type: new GraphQLNonNull(GraphQLID) },
        blogPostId: { type: new GraphQLNonNull(GraphQLID) },
        message: { type: GraphQLString },
    }
});
  
  export { commentType, commentInputType };