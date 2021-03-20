import AppError from './app.error';

describe('AppError', () => {
    describe('constructor', () => {
        it('should set required fields errorName, description, and isOperational', () => {
            const errorName = 'TestError';
            const description = 'Testing construction of AppError instances with required properties';
            const isOperational = true;
            const testError = new AppError(errorName, description, isOperational);
            expect(testError.errorName).toBe(errorName);
            expect(testError.description).toBe(description);
            expect(testError.isOperational).toBe(isOperational);
            expect(testError.httpCode).toBe(undefined);
        });
        it('should set optional fields httpCode if submitted', () => {
            const errorName = 'TestError';
            const description = 'Testing construction of AppError instances with required properties';
            const isOperational = true;
            const httpCode = 404;
            const testError = new AppError(errorName, description, isOperational, httpCode);
            expect(testError.errorName).toBe(errorName);
            expect(testError.description).toBe(description);
            expect(testError.isOperational).toBe(isOperational);
            expect(testError.httpCode).toBe(httpCode);
        });
    });
});
