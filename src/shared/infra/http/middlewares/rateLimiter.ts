import * as redis from 'redis'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/errors/AppError';

export const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  }
);

redisClient.on("error", (err) => console.log("Redis Client Error", err))

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 5,
  duration: 5
})

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try{
    await limiter.consume(request.ip)

    return next()
  } catch(err) {
    throw new AppError('Too many requests!', 429)
  }
}