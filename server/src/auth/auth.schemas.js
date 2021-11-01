const Joi = require('joi');

const signup = Joi.object({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30)
    .required(),

  password: Joi.string().regex(/^\S+$/).min(10).max(30).required(),
});

module.exports = {
  signup,
};
