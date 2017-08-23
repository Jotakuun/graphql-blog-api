import { GraphQLString } from 'graphql';

import { userType } from '../types/user';
import UserModel from '../../models/user-model';

let register = {
type: GraphQLString,
args: {
    username: {
        name: 'username',
        type: GraphQLString
    },
    email: {
        name: 'email',
        type: GraphQLString
    },
    password: {
        name: 'password',
        type: GraphQLString
    }
},
resolve (root, params) {
    // to do
}
};

export default { register };