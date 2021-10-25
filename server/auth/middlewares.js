const jwt = require('jsonwebtoken');

const unAuthorized = (res, next) => {
  const error = new Error('Un-Aothorized request');
  res.status(401);
  next(error);
};

const checkTokenSetUser = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) return next();

  const token = authHeader.split('Bearer ')[1];
  if (!token) return next();

  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    if (error)
      return console.error(
        `Error while checking user's token: ${error.message}`
      );
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

module.exports = { checkTokenSetUser, isLoggedIn, isAdmin };
