const auth = require('./auth/auth.middlewares');

const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found ${req.originalUrl}`);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message || 'Unknown backend error',
    stack: err.stack,
  });
};

module.exports = {
  auth,
  notFound,
  errorHandler,
};
