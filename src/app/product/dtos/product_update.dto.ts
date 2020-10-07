import Joi from 'joi';
import { IdealFor } from '../models/product.model';

export const productUpdateDto = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().optional().default(null),
    description: Joi.string().optional().default(null),
    category: Joi.array().items(Joi.string()).optional().default(null),
    size: Joi.array().items(Joi.string()).optional().default(null),
    color: Joi.array().items(Joi.string()).optional().default(null),
    tag: Joi.array().items(Joi.string()).optional().default(null),
    idealFor: Joi.array().items(Joi.number().integer().valid(...Object.values(IdealFor))).optional().default(null),
    basePrice: Joi.number().required(),
    discount: Joi.number().optional().default(0),
});
