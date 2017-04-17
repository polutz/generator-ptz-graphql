import { IUserApp } from 'ptz-user-domain';

import MenuSchema, { menu } from '../menus/menuSchema';
import UserSchema from '../users/userSchema';
import AppSchema, { app } from './appSchema';

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

    const appSchema = AppSchema({ log });
    const menuSchema = MenuSchema({ log });
    const userSchema = UserSchema({ userApp, log });

    const viewer = {};

    const viewerType = new GraphQLObjectType({
        name: 'Viewer',
        fields: () => ({
            id: globalIdField('Viewer'),
            app: { type: appSchema.appType, resolve: () => app },
            menu: { type: menuSchema.menuType, resolve: () => menu },
            userConnection: userSchema.getUserConnection()
        })
    });

    const outputViewer = {
        type: viewerType,
        resolve: () => viewer
    };

    const schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                viewer: {
                    type: viewerType,
                    resolve: () => viewer
                }
            })
        }),

        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: () => ({
                saveUser: userSchema.getSaveUserMutation(outputViewer)
            })
        })
    });

    return schema;
}

export default Schema;
