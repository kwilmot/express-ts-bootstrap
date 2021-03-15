import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import express, { RequestHandler } from 'express';
import App from './app';
import BaseController from './api/base.controller';
import UsersController from './api/users/users.controller';

// initialize configuration
dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);

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

const controllers: BaseController[] = [new UsersController()];

const app = new App(PORT);

app.loadGlobalMiddleware(globalMiddleware);
app.loadControllers(controllers);
app.startServer();
