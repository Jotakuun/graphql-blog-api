import { GraphQLString } from 'graphql';
import {Types} from 'mongoose';

import { userType } from '../types/user';
import UserModel from '../../models/user-model';

let login = {
    type: userType,
    args: {
        username: { 
            name: 'username',
            type: GraphQLString
        },
        password: { 
            name: 'password',
            type: GraphQLString
        }
    },
    resolve (root, params, context, info) {
    }

}
export default { login };