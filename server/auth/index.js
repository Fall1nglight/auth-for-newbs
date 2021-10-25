const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const db = require('../db/connection');
const rateLimitFns = require('../ratelimit/functions');

const users = db.get('users');
const router = express.Router();

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message:
    'Too many accounts created from this IP, please try again after an hour.',

  handler: rateLimitFns.handler,
});

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after 5 minutes.',

  handler: rateLimitFns.handler,
});

const checkLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: rateLimitFns.isValidUser,
  handler: rateLimitFns.handler,
});

users.createIndex('username', { unique: true });

const schema = Joi.object({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30)
    .required(),

  password: Joi.string().regex(/^\S+$/).min(10).max(30).required(),
});

const respondWithError = (res, next, error, statusCode) => {
  res.status(statusCode);
  next(error);
};

const createTokenSendResponse = (user, res, next) => {
  const payload = {
    _id: user._id,
    username: user.username,
    role: user.role,
    active: user.active,
  };

  jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { expiresIn: '1h' },
    (error, token) => {
      if (error) return respondWithError(res, next, error, 422);
      res.json({ token });
    }
  );
};

const throwError = (error) => {
  throw new Error(error);
};

router.post('/signup', signupLimiter, async (req, res, next) => {
  try {
    const {
      body: sentUser,
      body: { username, password },
    } = req;

    await schema.validateAsync(sentUser);

    const user = await users.findOne({ username: username });
    if (user) throwError('Username is taken. Please choose another one.');

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.insert({
      username: username,
      password: hashedPassword,
      active: true,
      role: 'user',
      createdAt: new Date().getTime(),
      updatedAt: 0,
    });

    if (!newUser) throwError('Failed to register. Please try again later.');

    createTokenSendResponse(newUser, res, next);
  } catch (error) {
    respondWithError(res, next, error, 422);
  }
});

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const {
      body: sentUser,
      body: { username, password },
    } = req;

    await schema.validateAsync(sentUser);

    const user = await users.findOne({ username: username });
    if (!user) throwError('Invalid login credentials. Please try again.');

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword)
      throwError('Invalid login credentials. Please try again.');

    const payload = {
      _id: user._id,
      username: user.username,
    };

    createTokenSendResponse(user, res, next);
  } catch (error) {
    respondWithError(res, next, error, 422);
  }
});

router.get('/checkuser', checkLimiter, (req, res, next) => {
  res.json({ user: req.user });
});

module.exports = router;
