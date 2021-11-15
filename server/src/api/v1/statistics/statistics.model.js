const db = require('../../../db/connection');

const statistics = db.get('statistics');
const notes = db.get('notes');

module.exports = { statistics, notes };
