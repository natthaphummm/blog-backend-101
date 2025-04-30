import 'dotenv/config';

export const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    server: {
        port: Number(process.env.PORT) || 3000,
    },
    db: {
        url: process.env.DATABASE_URL,
    },
    jwt: {
        accessSecret: process.env.JWT_SECRET || 'secret',
        accessExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'refreshSecret',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
};
