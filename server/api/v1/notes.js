const express = require('express');
const Joi = require('joi');

const db = require('./../../db/connection');
const notes = db.get('notes');

const router = express.Router();

const schema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  note: Joi.string().min(2).max(450).required(),
});

router.get('/', (req, res, next) => {
  try {
    console.log(req.user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;

    await schema.validateAsync(body);

    const newNote = await notes.insert({ ...body, user_id: req.user._id });

    res.json({ newNote });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
