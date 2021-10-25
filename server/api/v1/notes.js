const express = require('express');
const Joi = require('joi');

const db = require('../../db/connection');

const notes = db.get('notes');
const router = express.Router();

const insertSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  note: Joi.string().min(2).max(450).required(),
});

const updateSchema = Joi.object({
  title: Joi.string().min(2).max(30),
  note: Joi.string().min(2).max(450),
  reminder: Joi.boolean(),
});

router.get('/', async (req, res, next) => {
  try {
    const {
      user: { _id: user_id },
    } = req;
    const userNotes = await notes.find({ user_id: user_id });

    res.json({ userNotes });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {
      body,
      user: { _id: user_id },
    } = req;

    await insertSchema.validateAsync(body);

    const newNote = await notes.insert({
      ...body,
      reminder: false,
      createdAt: new Date().getTime(),
      updatedAt: 0,
      user_id: user_id,
    });

    if (!newNote) return res.json({ success: false });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const {
      body,
      params: { id: note_id },
      user: { _id: user_id },
    } = req;
    await updateSchema.validateAsync(body);

    const updatedNote = await notes.findOneAndUpdate(
      { _id: note_id, user_id: user_id },
      {
        $set: { ...body, updatedAt: new Date().getTime() },
      }
    );

    if (!updatedNote) return res.json({ success: false });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const {
      params: { id: note_id },
      user: { _id: user_id },
    } = req;

    const deletedNote = await notes.findOneAndDelete({
      _id: note_id,
      user_id: user_id,
    });

    if (!deletedNote) return res.json({ success: false });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
