const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../db/connection');
const users = db.get('users');
users.createIndex('username', { unique: true });

const router = express.Router();

const schema = Joi.object({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30)
    .required(),

  password: Joi.string().regex(/^\S+$/).min(10).max(30).required(),
});

// ! Remove this later
router.get('/', (req, res) => {
  res.json({
    message: 'Hi Auth!',
  });
});

// ! Improve with statusCode paramater
const respondWithError422 = (res, next, error) => {
  res.status(422);
  next(error);
};

const throwError = (error) => {
  throw new Error(error);
};

router.post('/signup', async (req, res, next) => {
  try {
    const {
      body: sentUser,
      body: { username, password },
    } = req;

    await schema.validateAsync(sentUser);

    const user = await users.findOne({ username: username });

    if (user) throwError('Username is taken. Please choose another one.');

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.insert({
      username: username,
      password: hashedPassword,
    });

    delete newUser.password;
    return res.json(newUser);
  } catch (error) {
    respondWithError422(res, next, error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const {
      body: sentUser,
      body: { username, password },
    } = req;

    await schema.validateAsync(sentUser);

    const user = await users.findOne({ username: username });

    if (!user) throwError('Invalid login credentials. Please try again.');

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword)
      throwError('Invalid login credentials. Please try again.');

    const payload = {
      _id: user._id,
      username: user.username,
    };

    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: '1h',
      },
      (error, token) => {
        if (error) return respondWithError422(res, next, error);
        res.json({ token });
      }
    );
  } catch (error) {
    respondWithError422(res, next, error);
  }
});

module.exports = router;
