import * as Joi from 'joi';

export const TaskSchema = Joi.object({
  title: Joi.string().required(),
  id: Joi.number(),
  status: Joi.string().valid('done', 'todo'),
}).options({
  abortEarly: false,
});
