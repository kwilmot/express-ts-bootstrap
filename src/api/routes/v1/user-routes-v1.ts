import express from 'express';
import { UserControllerV1 } from '../../controllers/v1';

export class UserRoutesV1 {
    public router;
    private userControllersV1: UserControllerV1;
    constructor() {
        this.userControllersV1 = new UserControllerV1();
        this.router = express.Router();
        this.router.route('/users').get(this.userControllersV1.fetchUsers);
        this.router.route('/users/:id').get(this.userControllersV1.fetchUserById);
    }
}
