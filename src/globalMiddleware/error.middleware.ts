import { Request as expressRequest, Response as expressResponse, NextFunction } from 'express';
import ErrorHandler from '../utilities/error.handler';

export default async function errorMiddleware(
    err: Error,
    _req: expressRequest,
    res: expressResponse,
    _next: NextFunction,
): Promise<void> {
    await ErrorHandler.handleError(err, res);
}
