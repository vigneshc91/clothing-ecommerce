import Joi from 'joi';
import { IdealFor } from '../models/product.model';

export const productCreateDto = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().optional(),
    description: Joi.string().optional(),
    category: Joi.array().items(Joi.string()).optional(),
    size: Joi.array().items(Joi.string()).optional(),
    color: Joi.array().items(Joi.string()).optional(),
    tag: Joi.array().items(Joi.string()).optional(),
    idealFor: Joi.array().items(Joi.number().integer().valid(...Object.values(IdealFor))).optional(),
    basePrice: Joi.number().required(),
    discount: Joi.number().optional(),
});
