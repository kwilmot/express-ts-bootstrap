import { RequestHandler, Router } from 'express';

export enum HttpMethods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

interface IRoute {
    path: string;
    method: HttpMethods;
    handler: RequestHandler;
    methodMiddleware: RequestHandler[];
}

// TODO: come up with SOLID way to extend routers from each other (ex. '/users', '/users/tests' where tests is its router built off of users
export default abstract class BaseRouter {
    private readonly router: Router;

    constructor(router: Router = Router()) {
        this.router = router;
    }

    public pathMiddleware: RequestHandler[] = [];

    public abstract path: string;

    protected abstract readonly routes: IRoute[];

    public setRoutes = (): Router => {
        this.loadPathMiddleware();
        this.routes.forEach((route) => {
            this.router[route.method](route.path, ...route.methodMiddleware, route.handler);
        });
        return this.router;
    };

    public loadPathMiddleware(): void {
        this.pathMiddleware.forEach((mw) => {
            this.router.use(mw);
        });
    }

    // TODO should we allow class children to get the parent router for extension? how do we lock down top level routers
    // protected getRouterForExtension(router: BaseRouter): Router {
    //   return this.router;
    // }
}
