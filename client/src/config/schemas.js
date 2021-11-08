import Joi from 'joi';

const insert = Joi.object({
  title: Joi.string()
    .min(2)
    .max(30)
    .required(),

  note: Joi.string()
    .min(2)
    .max(450)
    .required(),
});

export default {
  insert,
};
