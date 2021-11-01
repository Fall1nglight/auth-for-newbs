const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const db = require('../../db/connection');

const users = db.get('users');
const router = express.Router();

const insertSchema = Joi.object({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30)
    .required(),

  password: Joi.string().regex(/^\S+$/).min(10).max(30)
    .required(),
  role: Joi.string().valid('user', 'admin'),
  active: Joi.boolean(),
});

const updateSchema = Joi.object({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30),

  password: Joi.string().regex(/^\S+$/).min(10).max(30),
  role: Joi.string().valid('user', 'admin'),
  active: Joi.boolean(),
});

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await users.find({}, { fields: { password: 0 } });
    res.json({ allUsers });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const {
      body,
      params: { id: _id },
    } = req;

    await updateSchema.validateAsync(body);

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 12);
    }

    const updatedUser = await users.findOneAndUpdate(
      { _id },
      { $set: { ...body, updatedAt: new Date().getTime() } },
    );

    res.json({ updatedUser });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {
      body,
      body: { username, password },
    } = req;

    await insertSchema.validateAsync(body);

    const user = await users.findOne({ username });
    if (user) throw new Error('Username is taken. Please choose another one');

    const hashedPassword = await bcrypt.hash(password, 12);
    const insertedUser = await users.insert({
      role: 'user',
      active: true,
      ...body,
      password: hashedPassword,
      createdAt: new Date().getTime(),
      updatedAt: 0,
    });

    if (!insertedUser) throw new Error('Failed to insert user. Please try again later.');

    res.json({ insertedUser });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const {
      params: { id: _id },
    } = req;

    const deletedUser = await users.findOneAndDelete({ _id });

    if (!deletedUser) throw new Error('Failed to delete user. Please try again later.');

    res.json({ deletedUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
