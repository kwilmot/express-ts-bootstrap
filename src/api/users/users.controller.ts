import { NextFunction, Request as expressRequest, Response as expressResponse } from 'express';
import BaseController, { Methods } from '../base.controller';
import UsersService from './users.service';

export default class UsersController extends BaseController {
    path = '/users';

    routes = [
        {
            path: '',
            method: Methods.GET,
            handler: UsersController.handleFetchUsers,
            methodMiddleware: [],
        },
    ];

    public static async handleFetchUsers(
        _req: expressRequest,
        res: expressResponse,
        _next: NextFunction,
    ): Promise<void> {
        try {
            const result = await UsersService.fetchUsers();
            res.status(200).json(result);
        } catch (e) {
            console.error(e);
            res.status(500).send(e.message);
        }
    }
}
