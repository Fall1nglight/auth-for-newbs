const db = require('../../../db/connection');

const notes = db.get('notes');
const statistics = db.get('statistics');

module.exports = { notes, statistics };
