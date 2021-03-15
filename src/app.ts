import express, { RequestHandler } from 'express';
import BaseController from './api/base.controller';

export default class App {
    public app: express.Application = express();

    constructor(private port: number) {}

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
