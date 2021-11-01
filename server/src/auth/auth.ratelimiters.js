const rateLimit = require('express-rate-limit');

const rateLimitFns = require('../ratelimit/functions');

const signup = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message:
    'Too many accounts created from this IP, please try again after an hour.',

  handler: rateLimitFns.handler,
});

const login = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after 5 minutes.',

  handler: rateLimitFns.handler,
});

const checkUser = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: rateLimitFns.isValidUser,
  handler: rateLimitFns.handler,
});

module.exports = {
  signup,
  login,
  checkUser,
};
