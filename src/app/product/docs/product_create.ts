import joiToSwagger from 'joi-to-swagger';
import { productCreateDto } from '../dtos';

export default {
    path: '',
    description: 'Create product',
    summary: 'Create a new product',
    parameters: {
        body: joiToSwagger(productCreateDto).swagger,
    },
    security: {
        apiKey: [],
    },
    responses: {
        201: { description: 'Success' },
        401: { description: 'Unauthorized' },
        422: { description: 'Field Error' },
    },
};
