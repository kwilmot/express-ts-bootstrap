import express, { Response } from 'express';
import { Routes } from './api/routes';
import helmet from 'helmet';

class App {
    public app: express.Application;
    private routes: Routes;

    constructor() {
        this.routes = new Routes();
        this.app = express();
        this.config();
        // configure routes
        this.routes.register(this.app);
    }

    private config(): void {
        // * apply general header security using helmet
        this.app.use(helmet());
        // * support application/json type post data
        this.app.use(express.json());

        // * support application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({ extended: false }));
    }
}

export default new App().app;
