const rateLimit = require('express-rate-limit');

const rateLimitFns = require('./ratelimit/functions');

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again after an hour.',
  max: rateLimitFns.isValidUser,
  handler: rateLimitFns.handler,
});

module.exports = {
  apiLimiter,
};
