import { Request as expressRequest, Response as expressResponse } from 'express';
import UsersService from './users.service';

export default class UsersController {
    public static handleFetchUsers = async (_req: expressRequest, res: expressResponse): Promise<void> => {
        try {
            const result = await UsersService.fetchUsers();
            res.status(200).json(result);
        } catch (e) {
            console.error(e);
            res.status(500).send(e);
        }
    };
}
