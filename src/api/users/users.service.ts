export interface IUser {
    id: number;
    name: string;
    colors?: string[];
}

export default class UsersService {
    public static async fetchUsers(): Promise<IUser[]> {
        return new Promise<IUser[]>((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: 1,
                        name: 'User 1',
                        colors: ['blue', 'green'],
                    },
                    {
                        id: 3,
                        name: 'User 2',
                    },
                ]);
            }, 300);
        });
    }
}
