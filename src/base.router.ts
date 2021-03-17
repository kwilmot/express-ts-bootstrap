import { RequestHandler, Router } from 'express';

export enum HttpMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

interface IRoute {
    path: string;
    method: HttpMethods;
    handler: RequestHandler;
    methodMiddleware: RequestHandler[];
}
export default abstract class BaseRouter {
    public router: Router = Router();

    public pathMiddleware: RequestHandler[] = [];

    public abstract path: string;

    protected abstract readonly routes: IRoute[];

    public setRoutes = (): Router => {
        this.loadPathMiddleware();
        this.routes.forEach((route) => {
            switch (route.method) {
                case HttpMethods.GET: {
                    this.router.get(route.path, ...route.methodMiddleware, route.handler);
                    break;
                }
                case HttpMethods.POST: {
                    this.router.post(route.path, ...route.methodMiddleware, route.handler);
                    break;
                }
                case HttpMethods.PUT: {
                    this.router.put(route.path, ...route.methodMiddleware, route.handler);
                    break;
                }
                case HttpMethods.DELETE: {
                    this.router.delete(route.path, ...route.methodMiddleware, route.handler);
                    break;
                }
                default: {
                    throw new Error(`Unrecognized http method: ${route.method}`);
                }
            }
        });
        return this.router;
    };

    public loadPathMiddleware(): void {
        this.pathMiddleware.forEach((mw) => {
            this.router.use(mw);
        });
    }
}
