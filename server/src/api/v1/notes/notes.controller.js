const { notes, statistics } = require('./notes.model');
const { respondWithError } = require('../../../helpers');

const get = async (req, res, next) => {
  try {
    const {
      user: { _id: userId },
    } = req;

    const userNotes = await notes.find({ userId });

    res.json({ userNotes });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const allNotes = await notes.find({});

    res.json({ allNotes });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

const post = async (req, res, next) => {
  try {
    const {
      body,
      user: { _id: userId, username },
    } = req;

    const newNote = await notes.insert({
      ...body,
      public: false,
      createdBy: username,
      createdAt: new Date().getTime(),
      updatedAt: 0,
      userId,
    });

    if (!newNote) throw new Error('Failed to insert note. (Backend error)');

    res.json({ newNote });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

const patch = async (req, res, next) => {
  try {
    const {
      body,
      params: { id: noteId },
      user: { _id: userId },
    } = req;

    const updatedNote = await notes.findOneAndUpdate(
      { _id: noteId, userId },
      {
        $set: { ...body, updatedAt: new Date().getTime() },
      }
    );

    if (!updatedNote) throw new Error('Failed to update note. (Backend error)');

    if (body.title || body.note) {
      await statistics.findOneAndUpdate(
        { name: 'numOfEdited' },
        {
          $inc: { value: 1 },
        }
      );
    }

    res.json({ updatedNote });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

const deleteRoute = async (req, res, next) => {
  try {
    const {
      params: { id: noteId },
      user: { _id: userId },
    } = req;

    const deletedNote = await notes.findOneAndDelete({
      _id: noteId,
      userId,
    });

    if (!deletedNote) return res.json({ success: false });

    res.json({ success: true });
  } catch (error) {
    respondWithError(res, next, error);
  }
};

module.exports = {
  get,
  getAll,
  post,
  patch,
  deleteRoute,
};
