const express = require('express');

const middlewares = require('./users.middlewares');
const schemas = require('./users.schemas');
const controller = require('./users.controller');

const router = express.Router();

router.get('/', controller.get);
router.post('/', middlewares.validateUser(schemas.insert), controller.post);
router.patch(
  '/:id',
  middlewares.validateUser(schemas.update),
  controller.patch
);
router.delete('/:id', controller.deleteRoute);

module.exports = router;
