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

function UserSchema(userApp: IUserApp) {

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
                console.log('getting users');
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
                        console.log('ql user', user);
                        return { node: user, cursor: user.id };
                    }
                },
                store: outputStore
            },

            mutateAndGetPayload: async userArgs => {
                try {
                    console.log('saving user:', userArgs);
                    const savedUser = await userApp.save(userArgs);
                    console.log('saved user:', savedUser);
                    return savedUser;
                } catch (e) {
                    console.log('Error saving user:', e);
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
