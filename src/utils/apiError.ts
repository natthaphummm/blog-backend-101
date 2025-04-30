export default class ApiError extends Error {
    statusCode: number;
    success: boolean;

    errors: any[];
    data: null;
    stack?: string;

    constructor(
        statusCode: number,
        message = 'Something went wrong',
        errors = [],
        stack = '',
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.errors = errors;
        this.data = null;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
