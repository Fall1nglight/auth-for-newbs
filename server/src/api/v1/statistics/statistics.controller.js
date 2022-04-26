const { statistics, notes } = require('./statistics.model');
const { respondWithError } = require('../../../helpers');

const getNumOfNotes = async (req, res, next) => {
  try {
    const allNotes = await notes.find({});

    res.json({ numOfNotes: allNotes.length });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

const getEditedNotes = async (req, res, next) => {
  try {
    const numOfEdited = await statistics.findOne({ name: 'numOfEdited' });

    res.json({ numOfEdited: numOfEdited.value });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

const getPublicNotes = async (req, res, next) => {
  try {
    const publicNotes = await notes.find({ public: true });

    res.json({ numOfPublicNotes: publicNotes.length });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

module.exports = {
  getNumOfNotes,
  getEditedNotes,
  getPublicNotes,
};
