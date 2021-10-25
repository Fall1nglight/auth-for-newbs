const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const volleyball = require('volleyball');
const rateLimit = require('express-rate-limit');

const auth = require('./auth');
const notes = require('./api/v1/notes');
const users = require('./api/v1/users');
const middlewares = require('./auth/middlewares');
const rateLimitFns = require('./ratelimit/functions');

require('dotenv').config();

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again after an hour.',
  max: rateLimitFns.isValidUser,
  handler: rateLimitFns.handler,
});

const app = express();

app.use(volleyball);
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);
app.use(helmet());
app.use(express.json());
app.use(middlewares.checkTokenSetUser);

app.use('/auth', auth);
app.use('/api/v1/notes', apiLimiter, middlewares.isLoggedIn, notes);
app.use(
  '/api/v1/users',
  apiLimiter,
  middlewares.isLoggedIn,
  middlewares.isAdmin,
  users
);

const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found ${req.originalUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const errorMessage = err.message || 'Unknown error on the backend.';

  res.status(res.statusCode || 500);
  res.json({
    message: errorMessage,
    stack: err.stack,
  });
};

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
