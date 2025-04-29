import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { UserPayload } from "../schemas";
import ApiError from "../utils/apiError";

type AuthReq = Request & {
    user?: UserPayload;
};

export const authenticate = (
    req: AuthReq,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        throw new ApiError(401, "No token provided");
    }

    const payload = verifyAccessToken(token);

    if (!payload) {
        throw new ApiError(401, "Invalid or expired token");
    }

    req.user = payload;
    next();
};

export const authorize = (roles: string[]) => {
    return (req: AuthReq, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new ApiError(
                403,
                "You don't have permission to access this resource"
            );
        }
        next();
    };
};
