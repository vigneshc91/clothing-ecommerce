import Joi from 'joi';

export const productImageDeleteDto = Joi.object({
    image: Joi.array().items(Joi.string()).required(),
});
