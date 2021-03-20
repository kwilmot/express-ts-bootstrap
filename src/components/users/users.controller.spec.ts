import { NextFunction, Request as expressRequest, Response as expressResponse } from 'express';
import UsersController from './users.controller';
import UsersService, { IUser } from './users.service';
import spyOn = jest.spyOn;

jest.mock('./users.service', () => {
    return {
        fetchUsers: jest.fn(),
    };
});

describe('UsersController', () => {
    describe('handleFetchUsers', () => {
        const mockNext = jest.fn() as NextFunction;
        const mockRequest: expressRequest = {} as expressRequest;
        const mockResponse: expressResponse = ({
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        } as unknown) as expressResponse;
        it('should result in a 200 with a JSON payload of users if getting users is successful', async () => {
            const mockUsers: IUser[] = [
                {
                    id: 1,
                    name: 'Test Name',
                    colors: ['green', 'red'],
                },
            ];
            const fetchUsersSpy = spyOn(UsersService, 'fetchUsers');
            const statusSpy = spyOn(mockResponse, 'status');
            fetchUsersSpy.mockResolvedValueOnce(mockUsers);
            await UsersController.handleFetchUsers(mockRequest, mockResponse, mockNext);
            expect(statusSpy).toBeCalledWith(200);
            expect(mockResponse.json).toBeCalledWith(mockUsers);
        });
        it('should result in a 500 with an error if getting users fails', async () => {
            const fetchUsersSpy = spyOn(UsersService, 'fetchUsers');
            const mockError = new Error('test rejection');
            fetchUsersSpy.mockRejectedValueOnce(mockError);
            await UsersController.handleFetchUsers(mockRequest, mockResponse, mockNext);
            expect(mockNext).toBeCalledWith(mockError);
        });
    });
});
