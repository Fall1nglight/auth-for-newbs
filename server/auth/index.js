const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

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

router.get('/', (req, res) => {
  res.json({
    message: 'Hi Auth!',
  });
});

// ? Használjuk a value objektumot vagy legyen üres await function?

router.post('/signup', async (req, res, next) => {
  try {
    const verifiedUser = await schema.validateAsync(req.body);

    const user = await users.findOne({ username: verifiedUser.username });

    // TODO meg kell nézni, hogy működik-e a joi.trim()
    // * mongoDB compass laptopon

    if (!user) {
      const hashedPassword = await bcrypt.hash(verifiedUser.password, 12);
      const newUser = await users.insert({
        ...verifiedUser,
        password: hashedPassword,
      });

      delete newUser.password;
      return res.json(newUser);
    }

    throw new Error('A felhasználónév foglalt. Kérlek válassz egy újat.');
  } catch (error) {
    res.status(422);
    next(error);
  }
});

module.exports = router;
