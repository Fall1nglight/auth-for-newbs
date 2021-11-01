const notes = require('./notes.model');
const schemas = require('./notes.schemas');

const get = async (req, res, next) => {
  try {
    const {
      user: { _id: userId },
    } = req;
    const userNotes = await notes.find({ userId });

    res.json({ userNotes });
  } catch (error) {
    next(error);
  }
};

const post = async (req, res, next) => {
  try {
    const {
      body,
      user: { _id: userId },
    } = req;

    const newNote = await notes.insert({
      ...body,
      reminder: false,
      createdAt: new Date().getTime(),
      updatedAt: 0,
      userId,
    });

    if (!newNote) return res.json({ success: false });
    res.json({ success: true });
  } catch (error) {
    res.status(422);
    next(error);
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

    if (!updatedNote) return res.json({ success: false });
    res.json({ success: true });
  } catch (error) {
    res.status(422);
    next(error);
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
    next(error);
  }
};

module.exports = {
  get,
  post,
  patch,
  deleteRoute,
};
