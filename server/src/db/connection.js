const monk = require('monk');
require('dotenv').config();

const { TEST_DB_URL, DB_URL } = process.env;

// use test db in test mode otherwise use default db
const isInTest = typeof global.it === 'function';
const dbUrl = isInTest ? TEST_DB_URL : DB_URL;

const db = monk(dbUrl);

module.exports = db;
