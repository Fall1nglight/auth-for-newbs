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
  res.json({ message: 'Hi' });
});

router.post('/', async (req, res, next) => {
  try {
    const {
      body,
      body: { title, newNote },
    } = req;

    await schema.validateAsync(body);

    console.log(req.body);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
