import express, { RequestHandler } from 'express';
// import helmet from 'helmet';
// import Routes from './api/routes';
import BaseController from './api/base.controller';

export default class App {
    public app: express.Application = express();

    // private routes: Routes;

    constructor(private port: number) {
        // this.routes = new Routes();
        // this.app = express();
        // this.config();
        // configure routes
        // this.routes.register(this.app);
    }

    // private config(): void {
    //     // * apply general header security using helmet
    //     this.app.use(helmet());
    //     // * support application/json type post data
    //     this.app.use(express.json());
    //
    //     // * support application/x-www-form-urlencoded post data
    //     this.app.use(express.urlencoded({ extended: false }));
    // }

    public startServer(): void {
        this.app.listen(this.port, () => {
            console.log(`bootstrap app listening on port: ${this.port}`);
        });
    }

    public loadGlobalMiddleware(globalMiddleware: RequestHandler[]): void {
        globalMiddleware.forEach((mw) => {
            this.app.use(mw);
        });
    }

    public loadControllers(controllers: BaseController[]): void {
        controllers.forEach((controller) => {
            this.app.use(controller.path, controller.setRoutes());
        });
    }
}

// export default new App().app;
