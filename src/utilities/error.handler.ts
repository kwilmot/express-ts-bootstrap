import { Response as expressResponse } from 'express';
import AppError from './app.error';
import { logger } from './logger';

export default class ErrorHandler {
    public static handleError = (error: Error, responseStream?: expressResponse): void => {
        logger.error(error);
        ErrorHandler.crashIfUntrustedErrorOrSendResponse(error, responseStream);
    };

    public static crashIfUntrustedErrorOrSendResponse = (
        error: Error,
        responseStream: expressResponse | undefined,
    ): void => {
        if (!ErrorHandler.isTrustedError(error)) {
            process.exit(1);
        }
        if (responseStream) {
            let statusCode = 500;
            if (error instanceof AppError && error.httpCode) {
                statusCode = error.httpCode;
            }
            responseStream.status(statusCode).send(error.message);
        }
    };

    public static isTrustedError = (error: Error): boolean => {
        if (error instanceof AppError) {
            return error.isOperational;
        }
        return false;
    };
}
