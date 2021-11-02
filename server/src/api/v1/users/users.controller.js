const bcrypt = require('bcryptjs');

const { users } = require('./users.model');
const { respondWithError } = require('../../../helpers');

const get = async (req, res, next) => {
  try {
    const allUsers = await users.find({}, { fields: { password: 0 } });
    res.json({ allUsers });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

const post = async (req, res, next) => {
  try {
    const {
      body,
      body: { username, password },
    } = req;

    const user = await users.findOne({ username });
    if (user) {
      res.status(409);
      throw new Error('Username is taken. Please choose another one');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const insertedUser = await users.insert({
      role: 'user',
      active: true,
      ...body,
      password: hashedPassword,
      createdAt: new Date().getTime(),
      updatedAt: 0,
    });

    if (!insertedUser)
      throw new Error('Failed to insert user. Please try again later.');

    res.json({ insertedUser });
  } catch (error) {
    respondWithError(res, next, error);
  }
};
const patch = async (req, res, next) => {
  try {
    const {
      body,
      params: { id: _id },
    } = req;

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 12);
    }

    const updatedUser = await users.findOneAndUpdate(
      { _id },
      { $set: { ...body, updatedAt: new Date().getTime() } }
    );

    res.json({ updatedUser });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

const deleteRoute = async (req, res, next) => {
  try {
    const {
      params: { id: _id },
    } = req;

    const deletedUser = await users.findOneAndDelete({ _id });

    if (!deletedUser)
      throw new Error('Failed to delete user. Please try again later.');

    res.json({ deletedUser });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

module.exports = {
  get,
  post,
  patch,
  deleteRoute,
};
