import Joi from 'joi';

export const categoryCreateDto = Joi.object({
    name: Joi.string().required(),
});
