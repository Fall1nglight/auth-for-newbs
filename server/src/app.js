const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const volleyball = require('volleyball');

const routes = require('./routes');
const ratelimiters = require('./app.ratelimiters');
const middlewares = require('./app.middlewares');
require('dotenv').config();

const app = express();

app.use(volleyball);
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);
app.use(helmet());
app.use(express.json());
app.use(middlewares.auth.checkTokenSetUser);

app.use('/auth', routes.auth);
app.use(
  '/api/v1/notes',
  ratelimiters.api,
  middlewares.auth.isLoggedIn,
  routes.notes
);
app.use(
  '/api/v1/users',
  ratelimiters.api,
  middlewares.auth.isLoggedIn,
  middlewares.auth.isAdmin,
  routes.users
);
app.use(
  '/api/v1/statistics',
  ratelimiters.api,
  middlewares.auth.isLoggedIn,
  middlewares.auth.isAdmin,
  routes.statistics
);

app.use('/api/v1/public', routes.public);

app.get('/', (_req, res) => {
  res.json({ message: 'Homepage' });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
