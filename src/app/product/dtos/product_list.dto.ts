import Joi from 'joi';
import { IdealFor } from '../models/product.model';

export const productListDto = Joi.object({
    skip: Joi.number().integer().optional(),
    size: Joi.number().integer().optional(),
    sort: Joi.string().valid('name', '-name', 'price', '-price', 'createdAt', '-createdAt', 'updatedAt', '-updatedAt').optional(),
    idealFor: Joi.array().items(Joi.number().integer().valid(...Object.values(IdealFor))).optional(),
    category: Joi.array().items(Joi.string()).optional(),
    search: Joi.string().optional(),
    all: Joi.boolean().default(false).optional(),
});
