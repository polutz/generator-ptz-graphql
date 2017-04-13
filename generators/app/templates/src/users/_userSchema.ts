import { IUserApp } from 'ptz-user-domain';

import {
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromPromisedArray,
    mutationWithClientMutationId
} from 'graphql-relay';

import { Ilog } from 'ptz-log';

interface IUserSchemaArgs {
    userApp: IUserApp;
    log: Ilog;
}

function UserSchema({ userApp, log }: IUserSchemaArgs) {

    const userType = new GraphQLObjectType({
        name: 'User',
        fields: () => ({
            id: { type: GraphQLString },
            userName: { type: GraphQLString },
            email: { type: GraphQLString },
            emailConfirmed: { type: GraphQLBoolean },
            displayName: { type: GraphQLString },
            imgUrl: { type: GraphQLString },
            // createdBy,
            // dtChanged,
            errors: { type: new GraphQLList(GraphQLString) }
        })
    });

    const userConnection = connectionDefinitions({
        name: 'User',
        nodeType: userType
    });

    function getUserConnection() {
        return {
            type: userConnection.connectionType,
            args: connectionArgs,
            resolve: (_, args) => {
                log('getting users');
                return connectionFromPromisedArray(
                    userApp.find({}, { limit: args.first }),
                    args
                );
            }
        };
    }

    function getSaveUserMutation(outputStore) {

        return mutationWithClientMutationId({
            name: 'SaveUser',

            inputFields: {
                id: { type: GraphQLString },
                userName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                displayName: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                errors: { type: new GraphQLList(GraphQLString) }
            },

            outputFields: {
                userEdge: {
                    type: userConnection.edgeType,
                    resolve: (user) => {
                        log('ql user', user);
                        return { node: user, cursor: user.id };
                    }
                },
                store: outputStore
            },

            mutateAndGetPayload: async userArgs => {
                try {
                    log('saving user:', userArgs);
                    const savedUser = await userApp.save(userArgs);
                    log('saved user:', savedUser);
                    return savedUser;
                } catch (e) {
                    log('Error saving user:', e);
                }
            }
        });
    }

    return {
        getSaveUserMutation,
        getUserConnection
    };
}

export default UserSchema;
