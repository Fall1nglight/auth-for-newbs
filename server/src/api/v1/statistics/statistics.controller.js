const { users, notes, statistics } = require('./statistics.model');
const { respondWithError } = require('../../../helpers');

// todo | move getNotes to api/v1/notes
// todo | move getUsers to api/v1/users
// todo | restirct these routes to admin-acces only

// todo
// need two objects inside mongodb/statistics
// 1. numOfEdits
//  should contain a value named property which is a Number
//  when someone updates a note we should increment this value by 1

// 2. numOfMarkedDone
//  should contain a value named property which is a Number
//  when someone markes a note as done we should increment this value by 1

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await users.find({});

    res.json({ allUsers });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

const getNotes = async (req, res, next) => {
  try {
    const allNotes = await notes.find({});

    res.json({ allNotes });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

const getEditedNotes = async (req, res, next) => {
  try {
    // export name to a variable ?
    const numOfEdits = await statistics.find({ name: 'numOfEdits' });

    res.json({ numOfEdits });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

const getDoneNotes = async (req, res, next) => {
  try {
    const numOfMarkedDone = await statistics.find({ name: 'numOfMarkedDone' });

    res.json({ numOfMarkedDone });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

module.exports = {
  getUsers,
  getNotes,
  getEditedNotes,
  getDoneNotes,
};
