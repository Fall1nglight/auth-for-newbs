const { notes } = require('./public.model');
const { respondWithError } = require('../../../helpers');

const getNotes = async (req, res, next) => {
  try {
    const publicNotes = await notes.find({ reminder: true });

    res.json({ publicNotes });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

module.exports = {
  getNotes,
};
