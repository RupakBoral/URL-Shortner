export const CONFIG = {
    PORT: process.env.PORT || 8888,
    REDIS: {
        HOST: process.env.REDIS_HOST || 'localhost',
        PORT: Number(process.env.REDIS_PORT) || 6379,
        DB: Number(process.env.REDIS_DB) || 1,
        PASSWORD: process.env.REDIS_PASSWORD,
        RETRIES: Number(process.env.REDIS_RETRIES),
    },
    URL: {
        MAX_TTL: Number(process.env.URL_TTL) || 86400,
        BASE_URL: process.env.BASE_URL || 'http://localhost:8080',
        MAX_SIZE: Number(process.env.MAX_SIZE) || 8,
        AVG_SIZE: Number(process.env.AVG_SIZE) || 4,
    }
};