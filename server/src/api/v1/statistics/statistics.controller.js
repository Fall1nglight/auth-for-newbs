const { statistics } = require('./statistics.model');
const { respondWithError } = require('../../../helpers');

const getEditedNotes = async (req, res, next) => {
  try {
    const numOfEdited = await statistics.findOne({ name: 'numOfEdited' });

    res.json(numOfEdited);
  } catch (error) {
    respondWithError(res, next, error);
  }
};

const getDoneNotes = async (req, res, next) => {
  try {
    const numOfMarkedDone = await statistics.findOne({
      name: 'numOfMarkedDone',
    });

    res.json(numOfMarkedDone);
  } catch (error) {
    respondWithError(res, next, error);
  }
};

module.exports = {
  getEditedNotes,
  getDoneNotes,
};
