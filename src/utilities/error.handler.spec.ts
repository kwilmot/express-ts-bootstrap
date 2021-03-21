import { Response as expressResponse } from 'express';
import ErrorHandler from './error.handler';
import AppError from './app.error';
import { logger } from './logger';
import spyOn = jest.spyOn;

describe('ErrorHandler', () => {
    describe('handleError', () => {
        it('should log the error', () => {
            const testError = new AppError('TestError', 'Error for testing handleError', true);
            const mockResponse = ({
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown) as expressResponse;
            logger.error = jest.fn();
            const loggerErrorSpy = spyOn(logger, 'error');
            ErrorHandler.handleError(testError, mockResponse);
            expect(loggerErrorSpy).toBeCalledWith(testError);
        });
        it('should call crashIfUntrustedErrorOrSendResponse with provided error and response stream', () => {
            const testError = new AppError('TestError', 'Error for testing handleError', true);
            const mockResponse = ({
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown) as expressResponse;
            logger.error = jest.fn();
            const crashIfUntrustedErrorOrSendResponseSpy = spyOn(ErrorHandler, 'crashIfUntrustedErrorOrSendResponse');
            crashIfUntrustedErrorOrSendResponseSpy.mockReturnValueOnce(undefined);
            ErrorHandler.handleError(testError, mockResponse);
            expect(crashIfUntrustedErrorOrSendResponseSpy).toBeCalledWith(testError, mockResponse);
        });
    });
    describe('crashIfUntrustedErrorOrSendResponse', () => {
        const mockResponse = ({
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown) as expressResponse;
        const isTrustedErrorSpy = spyOn(ErrorHandler, 'isTrustedError');
        const statusSpy = spyOn(mockResponse, 'status');
        const sendSpy = spyOn(mockResponse, 'send');
        it('should call process.exit if isTrustedError returns false', () => {
            const testError = new AppError('TestError', 'Error for testing crashIfUntrustedErrorOrSendResponse', false);
            process.exit = jest.fn() as never;
            const processExitSpy = spyOn(process, 'exit');
            isTrustedErrorSpy.mockReturnValueOnce(false);
            ErrorHandler.crashIfUntrustedErrorOrSendResponse(testError, mockResponse);
            expect(processExitSpy).toBeCalledWith(1);
        });
        it('should return a response if error is operational', () => {
            const testError = new AppError('TestError', 'Error for testing crashIfUntrustedErrorOrSendResponse', true);
            isTrustedErrorSpy.mockReturnValueOnce(true);
            ErrorHandler.crashIfUntrustedErrorOrSendResponse(testError, mockResponse);
            expect(statusSpy).toBeCalledWith(500);
            expect(sendSpy).toBeCalledWith('Error for testing crashIfUntrustedErrorOrSendResponse');
        });
        it('should return a response with custom status code if error is operational and status code was defined', () => {
            const testError = new AppError(
                'TestError',
                'Error for testing crashIfUntrustedErrorOrSendResponse',
                true,
                404,
            );
            isTrustedErrorSpy.mockReturnValueOnce(true);
            ErrorHandler.crashIfUntrustedErrorOrSendResponse(testError, mockResponse);
            expect(statusSpy).toBeCalledWith(404);
            expect(sendSpy).toBeCalledWith('Error for testing crashIfUntrustedErrorOrSendResponse');
        });
    });
    describe('isTrustedError', () => {
        it('should return false if error is not instanceof AppError', () => {
            const testError = new Error('Error for testing isTrustedError');
            expect(ErrorHandler.isTrustedError(testError)).toBe(false);
        });
        it('should return true if error is AppError and isOperational is true', () => {
            const testError = new AppError('TestError', 'Error for testing isTrustedError', true);
            expect(ErrorHandler.isTrustedError(testError)).toBe(true);
        });
        it('should return false if error is AppError and isOperation is false', () => {
            const testError = new AppError('TestError', 'Error for testing isTrustedError', false);
            expect(ErrorHandler.isTrustedError(testError)).toBe(false);
        });
    });
});
