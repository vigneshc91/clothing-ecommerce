import Joi from 'joi';

export const categoryListDto = Joi.object({
    skip: Joi.number().integer().optional(),
    size: Joi.number().integer().optional(),
    sort: Joi.string().valid('name', '-name', 'createdAt', '-createdAt', 'updatedAt', '-updatedAt').optional(),
    search: Joi.string().optional(),
    all: Joi.boolean().default(false).optional(),
});
