import { Redis } from "ioredis";
import { CONFIG } from "./constants";

let redisClient: Redis;

const connectRedis = (): Redis => {
    try {
        const client = new Redis({
            host: CONFIG.REDIS.HOST,
            port: CONFIG.REDIS.PORT,
            db: CONFIG.REDIS.DB,
            password: CONFIG.REDIS.PASSWORD,
            retryStrategy: (times: number) => {
                if (times >= CONFIG.REDIS.RETRIES) {
                    console.error("Redis: Max retries reached. Stopping reconnect.");
                    return null;
                }
                return Math.min(times * 200, 2000);
            },
        });

        client.on('connect', () => console.info("Redis Connected!!"));
        client.on('error', (err) => console.error("Redis Error", err));
        client.on('close', () => console.warn("Redis connection closed"));

        return client;
    } catch (error) {
        console.error("Redis Connection Failed", error);
        process.exit(1);
    }
};

redisClient = connectRedis();

export default redisClient;