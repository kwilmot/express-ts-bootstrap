import { Request as expressRequest, Response as expressResponse } from 'express';
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
        it('should result in a 200 with a JSON payload of users if getting users is successful', async () => {
            const mockRequest: expressRequest = {} as expressRequest;
            const mockResponse: expressResponse = ({
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                send: jest.fn(),
            } as unknown) as expressResponse;
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
            await UsersController.handleFetchUsers(mockRequest, mockResponse);
            expect(statusSpy).toBeCalledWith(200);
            expect(mockResponse.json).toBeCalledWith(mockUsers);
        });
        it('should result in a 500 with an error if getting users fails', async () => {
            const mockRequest: expressRequest = {} as expressRequest;
            const mockResponse: expressResponse = ({
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                send: jest.fn(),
            } as unknown) as expressResponse;
            console.error = jest.fn();
            const errorSpy = spyOn(console, 'error');
            const fetchUsersSpy = spyOn(UsersService, 'fetchUsers');
            const statusSpy = spyOn(mockResponse, 'status');
            const mockError = new Error('test rejection');
            fetchUsersSpy.mockRejectedValueOnce(mockError);
            await UsersController.handleFetchUsers(mockRequest, mockResponse);
            expect(errorSpy).toBeCalledWith(mockError);
            expect(statusSpy).toBeCalledWith(500);
            expect(mockResponse.send).toBeCalledWith(mockError);
        });
    });
});
