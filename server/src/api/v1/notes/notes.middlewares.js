const validateNote = (schema) => async (req, res, next) => {
  try {
    const { body } = req;

    await schema.validateAsync(body);
    next();
  } catch (error) {
    res.status(422);
    next(error);
  }
};

module.exports = {
  validateNote,
};
