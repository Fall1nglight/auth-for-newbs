const db = require('../../../db/connection');

const users = db.get('users');
const notes = db.get('notes');
const statistics = db.get('notes');

module.exports = { users, notes, statistics };
