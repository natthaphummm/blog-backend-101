import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

interface ValidRequest extends Request {
    validatedQuery?: any;
}

export const validateBody = (schema: AnyZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: result.error.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message,
                })),
            });
        } else {
            req.body = result.data;
            next();
        }
    };
};

export const validateQuery = (schema: AnyZodObject) => {
    return (req: ValidRequest, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.query);

        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: result.error.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message,
                })),
            });
        } else {
            req.validatedQuery = result.data;
            next();
        }
    };
};
