import { NextFunction, Request as expressRequest, Response as expressResponse } from 'express';
import ErrorHandler from '../utilities/error.handler';
import errorMiddleware from './error.middleware';
import AppError from '../utilities/app.error';
import spyOn = jest.spyOn;

describe('errorMiddleware', () => {
    it('should call ErrorHandler.handleError with error and response stream provided', async () => {
        const errorMock = new AppError('TestError', 'Testing global errorMiddleware', true);
        const mockRequest = {} as expressRequest;
        const mockResponse = {} as expressResponse;
        const mockNext = {} as NextFunction;
        const handleErrorSpy = spyOn(ErrorHandler, 'handleError');
        handleErrorSpy.mockResolvedValueOnce(undefined);
        await errorMiddleware(errorMock, mockRequest, mockResponse, mockNext);
        expect(handleErrorSpy).toBeCalledWith(errorMock, mockResponse);
    });
});
