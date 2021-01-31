import express, { Response } from 'express';
import { Routes } from './api/routes';

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
        // * support application/json type post data
        this.app.use(express.json());

        // * support application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({ extended: false }));
    }
}

export default new App().app;
