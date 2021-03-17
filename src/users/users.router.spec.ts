import UsersRouter from './users.router';
import { HttpMethods } from '../base.router';
import UsersController from './users.controller';

describe('UsersRouter', () => {
    it('should have path defined', () => {
        const classInstance = new UsersRouter();
        expect(classInstance.path).toBe('/users');
    });
    it('should have routes defined', () => {
        const classInstance = new UsersRouter();
        const expectedRoutes = [
            {
                path: '',
                methodMiddleware: [],
                method: HttpMethods.GET,
                handler: UsersController.handleFetchUsers,
            },
        ];
        expect(classInstance.routes).toStrictEqual(expectedRoutes);
    });
    it('should have path middleware defined', () => {
        const classInstance = new UsersRouter();
        expect(classInstance.pathMiddleware).toStrictEqual([]);
    });
});
