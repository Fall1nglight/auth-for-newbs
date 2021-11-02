const express = require('express');

const ratelimiters = require('./auth.ratelimiters');
const middlewares = require('./auth.middlewares');
const controller = require('./auth.controller');

const defaultLoginError = 'Unable to login. Please try again later.';
const defaultSignupError = 'Username is taken. Please choose another one.';

const router = express.Router();

router.get('/checkuser', ratelimiters.checkUser, controller.checkUser);
router.post(
  '/signup',
  ratelimiters.signup,
  middlewares.validateUser,
  middlewares.findUser((user) => user, defaultSignupError, 409),
  controller.signup
);
router.post(
  '/login',
  ratelimiters.login,
  middlewares.validateUser,
  middlewares.findUser((user) => !(user && user.active), defaultLoginError),
  controller.login
);

module.exports = router;
