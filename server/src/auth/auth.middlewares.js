const jwt = require('jsonwebtoken');

const { users } = require('./auth.model');
const schemas = require('./auth.schemas');

const unAuthorized = (res, next) => {
  const error = new Error('Un-Authorized request');
  res.status(401);
  next(error);
};

const checkTokenSetUser = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) return next();

  const token = authHeader.split('Bearer ')[1];
  if (!token) return next();

  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    if (error) {
      return console.error(
        `Error while checking user's token: ${error.message}`
      );
    }
    req.user = user;
  });

  next();
};

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    unAuthorized(res, next);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    unAuthorized(res, next);
  }
};

// Validate schema
const validateUser = async (req, res, next) => {
  try {
    const { body } = req;
    await schemas.signup.validateAsync(body);
    next();
  } catch (error) {
    res.status(422);
    next(error);
  }
};

// Search user in db for a given condition
const findUser =
  (isError, errorMessage, statusCode = 422) =>
  async (req, res, next) => {
    try {
      const {
        body: { username },
      } = req;

      const user = await users.findOne({ username });

      // isError is a passed in function
      if (isError(user)) {
        res.status(statusCode);
        next(new Error(errorMessage));
      } else {
        req.loggingInUser = user;
        next();
      }
    } catch (error) {
      res.status(422);
      next(error);
    }
  };

module.exports = {
  checkTokenSetUser,
  isLoggedIn,
  isAdmin,
  validateUser,
  findUser,
};
