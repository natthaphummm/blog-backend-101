import { IAuthService } from '../interfaces';
import { UserCreate, UserCreateResponse, UserLoginResponse } from '../schemas';
import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import ApiError from '../utils/apiError';
import {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
} from '../utils/jwt';

export default class AuthService implements IAuthService {
    async register(data: UserCreate): Promise<UserCreateResponse> {
        const userExists = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (userExists) {
            throw new ApiError(409, 'User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
            },
        });
        return user as UserCreateResponse;
    }

    async login(data: UserCreate): Promise<UserLoginResponse> {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        if (!bcrypt.compareSync(data.password, user.password)) {
            throw new ApiError(401, 'Invalid password');
        }

        const accessToken = signAccessToken({
            id: user.id,
            role: user.role,
        });
        const refreshToken = signRefreshToken(user.id);

        await prisma.token.create({
            data: {
                userId: user.id,
                refreshToken,
            },
        });

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    }

    async logout(refreshToken: string): Promise<void> {
        const token = await prisma.token.findUnique({
            where: { refreshToken },
        });

        if (!token) {
            throw new ApiError(401, 'Unauthorized');
        }

        await prisma.token.updateMany({
            where: { refreshToken },
            data: {
                revoked: true,
            },
        });
    }

    async refreshToken(
        refreshToken: string,
    ): Promise<{ accessToken: string; newRefreshToken: string }> {
        const payload = verifyRefreshToken(refreshToken);
        if (!payload) {
            throw new ApiError(401, 'Invalid refresh token');
        }

        const storeToken = await prisma.token.findUnique({
            where: { refreshToken },
        });

        if (!storeToken || storeToken.revoked) {
            throw new ApiError(401, 'Token revoked or not found');
        }

        const user = await prisma.user.findUnique({
            where: { id: payload.id },
        });

        if (!user) {
            throw new ApiError(401, 'User not found');
        }

        await prisma.token.update({
            where: { refreshToken },
            data: {
                revoked: true,
            },
        });

        const newRefreshToken = signRefreshToken(user.id);
        await prisma.token.create({
            data: {
                userId: user.id,
                refreshToken: newRefreshToken,
            },
        });

        const accessToken = signAccessToken({
            id: user.id,
            role: user.role,
        });

        return { accessToken, newRefreshToken };
    }
}
