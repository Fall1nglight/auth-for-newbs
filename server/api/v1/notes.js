const express = require('express');
const Joi = require('joi');

const db = require('./../../db/connection');
const notes = db.get('notes');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ message: 'Hi' });
});

module.exports = router;
