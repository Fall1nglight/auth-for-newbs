const express = require('express');

const rateLimit = require('./auth.ratelimiters');
const middlewares = require('./auth.middlewares');
const controller = require('./auth.controller');

const defaultLoginError = 'Unable to login. Please try again later.';
const defaultSignupError = 'Username is taken. Please choose another one.';

const router = express.Router();

router.get('/checkuser', rateLimit.checkUser, controller.checkUser);
router.post(
  '/signup',
  rateLimit.signup,
  middlewares.validateUser,
  middlewares.findUser((user) => user, defaultSignupError, 409),
  controller.signup
);
router.post(
  '/login',
  rateLimit.login,
  middlewares.validateUser,
  middlewares.findUser((user) => !(user && user.active), defaultLoginError),
  controller.login
);

module.exports = router;
