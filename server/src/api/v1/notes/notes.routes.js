const express = require('express');

const middlewares = require('./notes.middlewares');
const schemas = require('./notes.schemas');
const controller = require('./notes.controller');

const router = express.Router();

router.get('/', controller.get);
router.post('/', middlewares.validateNote(schemas.insert), controller.post);
router.patch(
  '/:id',
  middlewares.validateNote(schemas.update),
  controller.patch
);
router.delete('/:id', controller.deleteRoute);

module.exports = router;
