import { Request, Response } from 'express';

export class UserControllerV1 {
    public fetchUsers(_: Request, res: Response): void {
        res.json({ msg: 'testing reload... fetching all users' });
    }

    public fetchUserById(req: Request, res: Response): void {
        const id = req.params.id;
        res.json({ msg: `fetching user by id: ${id}` });
    }
}
