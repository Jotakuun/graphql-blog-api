import { GraphQLInt } from 'graphql';

export default {
	offset: { 
		name: 'offset',
		type: GraphQLInt
	},
	limit: { 
		name: 'limit',
		type: GraphQLInt
	}
};
