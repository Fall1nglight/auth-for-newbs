const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const volleyball = require('volleyball');
const auth = require('./auth');

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

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/auth', auth);

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Not Found ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  const errorMessage = err.message || 'Unknown error on the backend.';

  res.status(res.statusCode || 500);
  res.json({
    message: errorMessage,
    stack: err.stack,
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
