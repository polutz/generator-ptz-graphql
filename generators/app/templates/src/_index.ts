import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import Schema from './core/schema';
import GraphQlHttp from 'express-graphql';
import { MongoClient } from 'mongodb';
import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import * as fs from 'fs';
import cors from 'cors';

import { UserApp } from 'ptz-user-app';
import { UserRepository } from 'ptz-user-repository';

import logFile from 'ptz-log-file';
const log = logFile({ dir: './logs' });

var app = express();
app.use(cors());

log('starting server');

const MONGO_URL = 'mongodb://localhost:27017/<%= appname %>',
    PORT = 3011;

function getRunningUrl(path) {
    return `http://localhost:${PORT}${path}`;
}

async function createGraphqlSchema(schema) {
    var json = await graphql(schema, introspectionQuery);
    var file = '/public/schema.json';
    fs.writeFile(`.${file}`, JSON.stringify(json, null, 2), err => {
        if (err) throw err;

        log('Json schema created!', getRunningUrl(file));
    });

    app.use('/public', express.static('public'));
}

(async () => {
    try {
        var db = await MongoClient.connect(MONGO_URL);

        var userApp = new UserApp({
            userRepository: new UserRepository(db),
            log
        });

        await userApp.seed();

        var schema = Schema(userApp, log);

        const graphqlFolder = '/graphql';
        app.use(graphqlFolder, GraphQlHttp({
            schema,
            graphiql: true
        }));

        await createGraphqlSchema(schema);

        app.listen(PORT, () => {
            const url = getRunningUrl(graphqlFolder);
            log(`Running on ${url}`);
        });
    }
    catch (e) {
        log(e);
    }
})();
