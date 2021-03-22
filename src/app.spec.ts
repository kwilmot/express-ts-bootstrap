import { Response as expressResponse, Request as expressRequest, RequestHandler, Router } from 'express';
import App from './app';
import BaseRouter from './base.router';
import spyOn = jest.spyOn;

const mockRouter = (jest.fn() as unknown) as Router;

class MockRouterClass extends BaseRouter {
    path = '/mock';

    pathMiddleware = [];

    routes = [];

    loadPathMiddleware = jest.fn();

    setRoutes = () => mockRouter;
}

describe('App', () => {
    describe('loadGlobalMiddleware', () => {
        it('should call app.use for the middleware provided to the method.', () => {
            const classInstance = new App();
            const globalMiddleware = (_req: expressRequest, _res: expressResponse) => {};
            const mockGlobalMiddleware: RequestHandler[] = [globalMiddleware];
            const appUseSpy = spyOn(classInstance.expressApplication, 'use');
            classInstance.loadGlobalMiddleware(mockGlobalMiddleware);
            expect(appUseSpy).toBeCalledWith(globalMiddleware);
        });
    });
    describe('loadRouters', () => {
        it('should call app.use against each provided router with the path and the setRoutes() as arguments', () => {
            const classInstance = new App();
            const mockRouterInstance = new MockRouterClass(mockRouter);
            const mockRouters: BaseRouter[] = [mockRouterInstance];
            const useSpy = spyOn(classInstance.expressApplication, 'use');
            classInstance.loadRouters(mockRouters);
            expect(useSpy).toBeCalledWith('/mock', mockRouterInstance.setRoutes());
        });
    });
});
