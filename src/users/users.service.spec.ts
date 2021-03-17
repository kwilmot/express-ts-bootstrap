import UsersService, { IUser } from './users.service';

describe('UsersService', () => {
    describe('fetchUsers', () => {
        it('should return mocked users', async () => {
            jest.useFakeTimers();
            const mockUsers: IUser[] = [
                {
                    id: 1,
                    name: 'User 1',
                    colors: ['blue', 'green'],
                },
                {
                    id: 3,
                    name: 'User 2',
                },
            ];
            const result = UsersService.fetchUsers();
            jest.runAllTimers();
            await expect(result).resolves.toStrictEqual(mockUsers);
        });
    });
});
