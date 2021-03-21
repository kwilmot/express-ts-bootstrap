import { Request as expressRequest, Response as expressResponse, NextFunction } from 'express';
import ErrorHandler from '../utilities/error.handler';

export default function errorMiddleware(
    err: Error,
    _req: expressRequest,
    res: expressResponse,
    _next: NextFunction,
): void {
    ErrorHandler.handleError(err, res);
}
