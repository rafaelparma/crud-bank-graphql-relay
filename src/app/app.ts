import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import connectMongoDB from './database/index'
import { graphqlHTTP } from 'koa-graphql';
import { graphqlSchemas } from './schemas/index';

    connectMongoDB();

    const app = new Koa();
    const router = new Router();

    router.all('/graphql', graphqlHTTP({
        schema: graphqlSchemas,
        graphiql: true,
    }));

    app.use(cors());
    app.use(bodyParser());
    app.use(router.routes()).use(router.allowedMethods());

export { app };



