const express = require('express');
const Joi = require('joi');

const db = require('./db/connection');
const users = db.get('users');

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

router.post('/signup', async (req, res) => {
  try {
    const value = await schema.validateAsync(req.body);
    console.log(value);
  } catch (error) {
    console.log(error.message || error);
  }
});

module.exports = router;
