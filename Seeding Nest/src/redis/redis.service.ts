import { Injectable, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService implements OnModuleDestroy{
    private readonly redisClient: Redis;

    constructor(){
        this.redisClient = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379',10),

        });
        this.redisClient.on('error',(error)=>{
            console.error('Redis Client Error:',error);
        });
    }
    get Client(): Redis{
        return this.redisClient;
    }
    async onModuleDestroy() {
        await this.redisClient.quit();
    }
}