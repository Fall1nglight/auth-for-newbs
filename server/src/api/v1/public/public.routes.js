const express = require('express');

const controller = require('./public.controller');

const router = express.Router();

router.get('/notes', controller.getNotes);

module.exports = router;
