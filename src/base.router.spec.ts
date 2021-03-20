// eslint-disable-next-line max-classes-per-file
import { Request as expressRequest, RequestHandler, Response as expressResponse } from 'express';
import BaseRouter, { HttpMethods } from './base.router';
import AppError from './utilities/app.error';
import spyOn = jest.spyOn;

jest.mock('express', () => {
    return {
        Router: () => {
            return {
                use: jest.fn(),
                get: jest.fn(),
                post: jest.fn(),
                put: jest.fn(),
                delete: jest.fn(),
            };
        },
    };
});

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

class BrokenRouter extends BaseRouter {
    path = '/test';

    // @ts-ignore
    routes = [
        {
            path: '/get',
            method: 'UNKNOWN',
            handler: TypicalRouter.testHandler,
            methodMiddleware: [],
        },
    ];

    pathMiddleware = [namedMiddleware];
}

describe('BaseRouter', () => {
    describe('setRoutes', () => {
        it('should call loadPathMiddleware', () => {
            const classInstance = new TypicalRouter();
            const loadPathMiddlewareSpy = spyOn(classInstance, 'loadPathMiddleware');
            classInstance.setRoutes();
            expect(loadPathMiddlewareSpy).toHaveBeenCalledTimes(1);
        });
        it('should call appropriate router methods for each route provided', () => {
            const classInstance = new TypicalRouter();
            const getSpy = spyOn(classInstance.router, 'get');
            const postSpy = spyOn(classInstance.router, 'post');
            const putSpy = spyOn(classInstance.router, 'put');
            const deleteSpy = spyOn(classInstance.router, 'delete');

            classInstance.setRoutes();
            expect(getSpy).toHaveBeenCalledWith('/get', TypicalRouter.testHandler);
            expect(postSpy).toHaveBeenCalledWith('/post', TypicalRouter.testHandler);
            expect(putSpy).toHaveBeenCalledWith('/put', TypicalRouter.testHandler);
            expect(deleteSpy).toHaveBeenCalledWith('/delete', TypicalRouter.testHandler);
        });
        it('should throw error if unknown Http Method is attempted', () => {
            const classInstance = new BrokenRouter();
            const mockError = new AppError('UnknownHttpMethod', 'Router received an unexpected method: UNKNOWN', false);
            expect(classInstance.setRoutes).toThrowError(mockError);
        });
    });
    describe('loadPathMiddleware', () => {
        it('should call router.use for each path middleware', () => {
            const classInstance = new TypicalRouter();
            const routerSpy = spyOn(classInstance.router, 'use');
            classInstance.loadPathMiddleware();
            expect(routerSpy).toHaveBeenCalledWith(namedMiddleware);
        });
    });
});
