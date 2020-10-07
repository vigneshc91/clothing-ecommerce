import Joi from 'joi';

export const categoryUpdateDto = Joi.object({
    name: Joi.string().required(),
});
