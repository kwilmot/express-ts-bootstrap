import express, { Response } from 'express';
import { ApiV1 } from './v1';

export class Routes {
    private apiV1: ApiV1;

    constructor() {
        this.apiV1 = new ApiV1();
    }

    public register(app: express.Application): void {
        app.use('/api/v1', this.apiV1.router);
        app.use('/', (_, res: Response) => {
            res.send('Hello from express-typescript-bootstrap!');
        });
    }
}
