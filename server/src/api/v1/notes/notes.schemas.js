const Joi = require('joi');

const insert = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  note: Joi.string().min(2).max(450).required(),
});

const update = Joi.object({
  title: Joi.string().min(2).max(30),
  note: Joi.string().min(2).max(450),
  public: Joi.boolean(),
})
  .or('title', 'note', 'public')
  .required();

module.exports = {
  insert,
  update,
};
