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

  password: Joi.string().trim().min(10).max(30).required(),
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

    // * Need to hash the password
    // ! mongodbcompass

    if (!user) {
      const hashedPassword = await bcrypt.hash(verifiedUser.password, 12);
      const newUser = await users.insert({
        ...verifiedUser,
        password: hashedPassword,
      });

      res.json(newUser);
    }

    throw new Error('A felhasználónév foglalt. Kérlek válassz egy újat.');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
