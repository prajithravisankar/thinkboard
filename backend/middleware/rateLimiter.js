import ratelimit from "../src/config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit('my-rate-limit');
        if (!success) return res.status(429).json({message: "too many requests, try again later!"});
        next();
    } catch (error) {
        console.error("error in ratelimiter middleware", error);
        next(error);
    }
}

export default rateLimiter;