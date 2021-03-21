import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import express, { RequestHandler } from 'express';
import * as http from 'http';
import BaseRouter from './base.router';
import UsersRouter from './components/users/users.router';
import App from './app';
import ErrorHandler from './utilities/error.handler';
import errorMiddleware from './globalMiddleware/error.middleware';
import { expressLogger, logger } from './utilities/logger';

// initialize configuration
dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}
const { PORT } = process.env;

const globalMiddleware: RequestHandler[] = [
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

appInstance.loadGlobalMiddleware(globalMiddleware);
appInstance.loadRouters(routers);
// TODO: Consider creating preLoadGlobalMiddleware and postLoadGlobalMiddleware methods on the App class
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
