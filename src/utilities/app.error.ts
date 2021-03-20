export default class AppError extends Error {
    public readonly errorName: string;

    public readonly description: string;

    public readonly isOperational: boolean;

    public readonly httpCode: number | undefined;

    constructor(errorName: string, description: string, isOperational: boolean, httpCode?: number) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
        this.errorName = errorName;
        this.description = description;
        this.isOperational = isOperational;
        this.httpCode = httpCode;

        Error.captureStackTrace(this);
    }
}
