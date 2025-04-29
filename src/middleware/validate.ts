import { Request, Response, NextFunction } from "express";
import { z, AnyZodObject } from "zod";

export const validate = (
    schema: AnyZodObject,
    source: "body" | "params" | "query" = "body"
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[source]);

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
            req[source] = result.data;

            next();
        }
    };
};
