import express from 'express';
import { UserRoutesV1 } from './user-routes-v1';

export class ApiV1 {
    public router: express.Router;
    private userRoutesV1: UserRoutesV1;

    constructor() {
        this.userRoutesV1 = new UserRoutesV1();
        this.router = express.Router();
        this.router.use('', this.userRoutesV1.router);
    }
}
