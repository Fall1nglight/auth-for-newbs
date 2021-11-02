const Joi = require('joi');

const insert = Joi.object({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30)
    .required(),

  password: Joi.string().regex(/^\S+$/).min(10).max(30).required(),
  role: Joi.string().valid('user', 'admin'),
  active: Joi.boolean(),
});

const update = Joi.object({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30),

  password: Joi.string().regex(/^\S+$/).min(10).max(30),
  role: Joi.string().valid('user', 'admin'),
  active: Joi.boolean(),
})
  .or('username', 'password', 'role', 'active')
  .required();

module.exports = {
  insert,
  update,
};
