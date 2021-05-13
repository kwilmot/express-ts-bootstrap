import { Request as expressRequest, RequestHandler, Response as expressResponse, Router } from 'express';
import BaseRouter, { HttpMethods } from './base.router';
import spyOn = jest.spyOn;

const namedMiddleware: RequestHandler = (_req: expressRequest, _res: expressResponse) => {};

class TypicalRouter extends BaseRouter {
    path = '/test';

    routes = [
        {
            path: '/get',
            method: HttpMethods.GET,
            handler: TypicalRouter.testHandler,
            methodMiddleware: [],
        },
        {
            path: '/post',
            method: HttpMethods.POST,
            handler: TypicalRouter.testHandler,
            methodMiddleware: [],
        },
        {
            path: '/put',
            method: HttpMethods.PUT,
            handler: TypicalRouter.testHandler,
            methodMiddleware: [],
        },
        {
            path: '/delete',
            method: HttpMethods.DELETE,
            handler: TypicalRouter.testHandler,
            methodMiddleware: [],
        },
    ];

    pathMiddleware = [namedMiddleware];

    public static testHandler = (): void => {};
}

describe('BaseRouter', () => {
    const mockRouter = {
        use: jest.fn(),
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
    } as unknown as Router;
    describe('setRoutes', () => {
        it('should call loadPathMiddleware', () => {
            const classInstance = new TypicalRouter();
            const loadPathMiddlewareSpy = spyOn(classInstance, 'loadPathMiddleware');
            classInstance.setRoutes();
            expect(loadPathMiddlewareSpy).toHaveBeenCalledTimes(1);
        });
        it('should call appropriate router methods for each route provided', () => {
            const classInstance = new TypicalRouter(mockRouter);
            const getSpy = spyOn(mockRouter, 'get');
            const postSpy = spyOn(mockRouter, 'post');
            const putSpy = spyOn(mockRouter, 'put');
            const deleteSpy = spyOn(mockRouter, 'delete');

            classInstance.setRoutes();
            expect(getSpy).toHaveBeenCalledWith('/get', TypicalRouter.testHandler);
            expect(postSpy).toHaveBeenCalledWith('/post', TypicalRouter.testHandler);
            expect(putSpy).toHaveBeenCalledWith('/put', TypicalRouter.testHandler);
            expect(deleteSpy).toHaveBeenCalledWith('/delete', TypicalRouter.testHandler);
        });
    });
    describe('loadPathMiddleware', () => {
        it('should call router.use for each path middleware', () => {
            const classInstance = new TypicalRouter(mockRouter);
            const routerSpy = spyOn(mockRouter, 'use');
            classInstance.loadPathMiddleware();
            expect(routerSpy).toHaveBeenCalledWith(namedMiddleware);
        });
    });
});
