const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = require('./auth.model');

const respondWithError = (res, next, error) => {
  // set default statusCode to 500 in case it is not defined with res.status

  res.status(res.statusCode === 200 ? 500 : res.statusCode);
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
    (error, token) =>
      // if there was an error respond with it othwerwise respond with JWT
      error ? respondWithError(res, next, error) : res.json({ token })
  );
};

const checkUser = (req, res) => {
  res.json({ user: req.user });
};

const signup = async (req, res, next) => {
  try {
    const {
      body: { username, password },
    } = req;

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.insert({
      username,
      password: hashedPassword,
      active: true,
      role: 'user',
      createdAt: new Date().getTime(),
      updatedAt: 0,
    });

    if (!newUser)
      throw new Error('Failed to register. Please try again later.');

    createTokenSendResponse(newUser, res, next);
  } catch (error) {
    respondWithError(res, next, error);
  }
};

const login = async (req, res, next) => {
  try {
    const {
      body: { password },
      loggingInUser: user,
    } = req;

    const correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword) return createTokenSendResponse(user, res, next);

    res.status(422);
    throw new Error('Invalid login credentials. Please try again.');
  } catch (error) {
    respondWithError(res, next, error);
  }
};

module.exports = {
  signup,
  login,
  checkUser,
};