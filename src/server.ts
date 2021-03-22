import dotenv from 'dotenv';
// initialize configuration, dotenv must be launched and configured before any other files construct in order for changes
// from .env file to propagate.
dotenv.config();

/* eslint-disable  import/first */
import cors from 'cors';
import helmet from 'helmet';
import express, { RequestHandler } from 'express';
import * as http from 'http';
import BaseRouter from './base.router';
import UsersRouter from './components/users/users.router';
import App from './app';
import ErrorHandler from './utilities/error.handler';
import errorMiddleware from './globalMiddleware/error.middleware';
import { expressLogger, logger } from './utilities/logger';
/* eslint-enable import/first */

if (!process.env.PORT) {
    process.exit(1);
}
const { PORT } = process.env;

const preRequestGlobalMiddleware: RequestHandler[] = [
    // * apply general header security using helmet
    helmet(),
    // * apply CORS rules
    cors(),
    // * support application/json type post data
    express.json(),
    // * support application/x-www-form-urlencoded post data
    express.urlencoded({ extended: false }),
    // * support logging of requests
    expressLogger,
];

const routers: BaseRouter[] = [new UsersRouter()];

const appInstance = new App();

/**
 * In Express JS, load order of middleware is very important. They will be fired in order  they are loaded.
 * For this reason, we load our preRequestGlobalMiddleware in before setting our routes.
 * Once we load our routers (which will invoke setRoutes, which in turn fires off path and method middleware),
 * only then do we wish to handle our errors. Thus, at the top level we call .use against our custom errorMiddleware
 */
appInstance.loadGlobalMiddleware(preRequestGlobalMiddleware);
appInstance.loadRouters(routers);
appInstance.expressApplication.use(errorMiddleware);

const server = http.createServer(appInstance.expressApplication);
server.listen(PORT, () => {
    logger.info(`Node Express Bootstrap listening on ${PORT}`);
});

process.on('uncaughtException', (error: Error) => {
    ErrorHandler.handleError(error);
});

// TODO: revisit handling unhandledRejection errors / are these possible in Typescript 4 and node 14.5?
process.on('unhandledRejection', (reason: string) => {
    throw new Error(reason);
});
