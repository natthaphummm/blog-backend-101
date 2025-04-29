import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { UserPayload } from "../schemas";

export const signAccessToken = ({ id, role }: UserPayload) => {
    return jwt.sign({ id, role }, config.jwt.accessSecret, {
        expiresIn: config.jwt.accessExpiresIn,
    } as jwt.SignOptions);
};

export const signRefreshToken = (id: number) => {
    return jwt.sign({ id }, config.jwt.refreshSecret, {
        expiresIn: config.jwt.refreshExpiresIn,
    } as jwt.SignOptions);
};

export const verifyAccessToken = (token: string) => {
    return (jwt.verify(token, config.jwt.accessSecret) as UserPayload) ?? null;
};

export const verifyRefreshToken = (token: string) => {
    return (
        (jwt.verify(token, config.jwt.refreshSecret) as { id: number }) ?? null
    );
};
