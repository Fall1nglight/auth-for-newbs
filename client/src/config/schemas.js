import Joi from 'joi';

const note = {
  insert: Joi.object({
    title: Joi.string()
      .min(2)
      .max(30)
      .required(),

    note: Joi.string()
      .min(2)
      .max(450)
      .required(),
  }),
};

const auth = {
  login: Joi.object({
    username: Joi.string()
      .regex(/(^[a-zA-Z0-9_]+$)/)
      .min(2)
      .max(30)
      .required(),

    password: Joi.string()
      .regex(/^\S+$/)
      .min(10)
      .max(30)
      .required(),
  }),

  signup: Joi.object({
    username: Joi.string()
      .regex(/(^[a-zA-Z0-9_]+$)/)
      .min(2)
      .max(30)
      .required(),

    password: Joi.string()
      .regex(/^\S+$/)
      .min(10)
      .max(30)
      .required(),

    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .label('Confirm Password')
      .messages({ 'any.only': '{{#label}} does not match' })
      .required(),
  }),
};

export default {
  note,
  auth,
};
