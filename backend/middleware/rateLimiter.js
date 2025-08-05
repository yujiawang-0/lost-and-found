// backend/middleware/rateLimiter.js
import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const identifier = req.ip || "global";
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    next(error);
  }
};

export default rateLimiter;
