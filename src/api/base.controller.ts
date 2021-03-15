import { RequestHandler, Router } from 'express';

export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

interface IRoute {
    path: string;
    method: Methods;
    handler: RequestHandler;
    methodMiddleware: RequestHandler[];
}

export default abstract class BaseController {
    public router: Router = Router();

    public pathMiddleware: RequestHandler[] = [];

    public abstract path: string;

    protected abstract readonly routes: IRoute[];

    public setRoutes = (): Router => {
        this.pathMiddleware.forEach((mw) => {
            this.router.use(mw);
        });
        this.routes.forEach((route) => {
            switch (route.method) {
                case Methods.GET: {
                    this.router.get(route.path, ...route.methodMiddleware, route.handler);
                    break;
                }
                case Methods.POST: {
                    this.router.post(route.path, ...route.methodMiddleware, route.handler);
                    break;
                }
                case Methods.PUT: {
                    this.router.put(route.path, ...route.methodMiddleware, route.handler);
                    break;
                }
                case Methods.DELETE: {
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
}
