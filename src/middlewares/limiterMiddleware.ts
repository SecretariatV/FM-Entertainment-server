import { rateLimit } from "express-rate-limit";

export const limiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
