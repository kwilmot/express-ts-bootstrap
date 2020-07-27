import express, { Response } from 'express';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        // configure routes
        // routes.register(this.app)
        this.app.use('/', (_, res: Response) => {
            res.send('Hello from express-typescript-bootstrap!');
        });
    }

    private config(): void {
        // * support application/json type post data
        this.app.use(express.json());

        // * support application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({ extended: false }));
    }
}

export default new App().app;
