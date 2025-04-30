import { Request, Response } from 'express';
import { IAuthService } from '../interfaces';
import { config } from '../config/env';
import ApiError from '../utils/apiError';

export default class AuthController {
    constructor(private readonly service: IAuthService) {}

    async register(req: Request, res: Response) {
        const result = await this.service.register(req.body);
        res.status(201).json(result);
    }

    async login(req: Request, res: Response) {
        const { accessToken, refreshToken, user } = await this.service.login(
            req.body,
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: config.nodeEnv === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }).json({
            accessToken,
            user,
        });
    }

    async logout(req: Request, res: Response) {
        if (!req.cookies.refreshToken) {
            throw new ApiError(401, 'Unauthorized');
        }
        await this.service.logout(req.cookies.refreshToken);
        res.clearCookie('refreshToken', { path: '/' });
        res.json({ message: 'Logged out successfully' });
    }

    async refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            throw new ApiError(401, 'Unauthorized');
        }
        const { accessToken, newRefreshToken } =
            await this.service.refreshToken(refreshToken);

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: config.nodeEnv === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }).json({
            accessToken,
        });
    }
}
