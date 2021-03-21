import { NextFunction, Request as expressRequest, Response as expressResponse } from 'express';
import UsersService from './users.service';

export default class UsersController {
    public static handleFetchUsers = async (
        req: expressRequest,
        res: expressResponse,
        next: NextFunction,
    ): Promise<void> => {
        try {
            req.log.info('handleFetchUsers');
            const result = await UsersService.fetchUsers();
            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    };
}
