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

function AppSchema({ log }) {

    const appType = new GraphQLObjectType({
        name: 'App',
        fields: () => ({
            title: { type: GraphQLString },
            subTitle: { type: GraphQLString }
        })
    });

    return {
        appType
    };
}

export default AppSchema;

export const app = {
    title: 'Polutz',
    subTitle: 'Framework or Boilerplate?'
};
