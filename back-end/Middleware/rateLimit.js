import BaseMiddleware from "../Core/BaseMiddleware.js";
import { Redis } from "../global.js";
import { RateLimiterRedis } from "rate-limiter-flexible";

class RateLimit extends BaseMiddleware {
  #rateLimiter = null;
  constructor(key, numberRequest, durationSecond, blockDurationSecond = 60) {
    super();
    const config = {
      storeClient: Redis.redis,
      keyPrefix: key,
      points: numberRequest,
      duration: durationSecond,
      blockDuration: blockDurationSecond,
    };
    this.#rateLimiter = new RateLimiterRedis(config);
  }

  async handle(req, res, next) {
    try {
      this.#rateLimiter
        .consume(req.ip)
        .then(() => {
          next();
        })
        .catch(() => {
          return res
          .status(429)
          .json({ success: false, message: `Too_many_request` });
        });
    } catch (e) {
      return super.toError(e, req, res);
    }
  }
}

export default RateLimit;
