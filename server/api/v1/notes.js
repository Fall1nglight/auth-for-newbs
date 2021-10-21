const express = require('express');
const Joi = require('joi');

const db = require('./../../db/connection');
const notes = db.get('notes');

const router = express.Router();

const schema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  note: Joi.string().min(2).max(450).required(),
});

router.get('/', async (req, res, next) => {
  try {
    const { user } = req;
    const userNotes = await notes.find({ user_id: user._id });

    res.json({ userNotes });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body, user } = req;

    await schema.validateAsync(body);

    const newNote = await notes.insert({
      ...body,
      createdAt: new Date().getTime(),
      user_id: user._id,
    });

    res.json({ newNote });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
