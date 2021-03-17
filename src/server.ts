import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import express, { RequestHandler } from 'express';
import * as http from 'http';
import BaseRouter from './base.router';
import UsersRouter from './users/users.router';
import App from './app';

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
];

const routers: BaseRouter[] = [new UsersRouter()];

const appInstance = new App();

appInstance.loadGlobalMiddleware(globalMiddleware);
appInstance.loadRouters(routers);
const server = http.createServer(appInstance.expressApplication);
server.listen(PORT, () => {
    console.log(`Node Express Bootstrap listening on ${PORT}`);
});
