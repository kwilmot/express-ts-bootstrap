import express, { RequestHandler } from 'express';
import BaseRouter from './base.router';

export default class App {
    public expressApplication: express.Application = express();

    public loadGlobalMiddleware(globalMiddleware: RequestHandler[]): void {
        globalMiddleware.forEach((mw) => {
            this.expressApplication.use(mw);
        });
    }

    public loadRouters(routers: BaseRouter[]): void {
        routers.forEach((router) => {
            this.expressApplication.use(router.path, router.setRoutes());
        });
    }
}
