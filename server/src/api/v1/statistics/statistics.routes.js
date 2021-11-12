const express = require('express');

const controller = require('./statistics.controller');

const router = express.Router();

router.get('/edited-notes', controller.getEditedNotes);
router.get('/done-notes', controller.getDoneNotes);

module.exports = router;
