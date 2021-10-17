const jwt = require('jsonwebtoken');

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
    const error = new Error('Un-Aothorized request');
    res.status(401);
    next(error);
  }
};

module.exports = { checkTokenSetUser, isLoggedIn };
