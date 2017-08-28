import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean
  } from 'graphql';
  
  const userType = new GraphQLObjectType({
      name: 'user',
      fields: {
          _id: { type: new GraphQLNonNull(GraphQLID) },
          username: { type: GraphQLString },
          email: { type: GraphQLString },
          admin: { type: GraphQLBoolean }
      }
  });

  const userInputType = new GraphQLInputObjectType({
    name: 'userInput',
    fields: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        admin: { type: GraphQLBoolean }
    }
});
  
  export {userType, userInputType};