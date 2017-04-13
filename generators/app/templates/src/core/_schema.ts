import { IUserApp } from 'ptz-user-domain';
import UserSchema from '../users/userSchema';

import {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql';

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromPromisedArray,
    globalIdField,
    mutationWithClientMutationId
} from 'graphql-relay';

import { Ilog } from 'ptz-log';

function Schema(userApp: IUserApp, log: Ilog) {

    const userSchema = UserSchema({ userApp, log });

    const store = {};

    const storeType = new GraphQLObjectType({
        name: 'Store',
        fields: () => ({
            id: globalIdField('Store'),
            userConnection: userSchema.getUserConnection()
        })
    });

    const outputStore = {
        type: storeType,
        resolve: () => store
    };

    const schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                store: {
                    type: storeType,
                    resolve: () => store
                }
            })
        }),

        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: () => ({
                saveUser: userSchema.getSaveUserMutation(outputStore)
            })
        })
    });

    return schema;
}

export default Schema;
