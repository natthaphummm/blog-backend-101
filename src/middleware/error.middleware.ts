import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Internal Server Error';
        error = new ApiError(
            statusCode,
            message,
            error?.errors || [],
            error.stack,
        );
    }

    const response = {
        success: false,
        message: error.message,
        errors: error.errors,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    };

    res.status(error.statusCode).json(response);
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new ApiError(404, `Route ${req.originalUrl} not found`);
    next(error);
};
