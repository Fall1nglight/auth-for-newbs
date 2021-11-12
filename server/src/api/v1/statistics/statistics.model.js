const db = require('../../../db/connection');

const statistics = db.get('statistics');

module.exports = { statistics };
