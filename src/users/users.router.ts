import BaseRouter, { HttpMethods } from '../base.router';
import UsersController from './users.controller';

export default class UsersRouter extends BaseRouter {
    path = '/users';

    routes = [
        {
            path: '',
            method: HttpMethods.GET,
            handler: UsersController.handleFetchUsers,
            methodMiddleware: [],
        },
    ];
}
