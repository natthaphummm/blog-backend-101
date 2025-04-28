import "dotenv/config";

export const config = {
    server: {
        port: Number(process.env.PORT) || 3000,
    },
};
