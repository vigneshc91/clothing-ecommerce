import joiToSwagger from 'joi-to-swagger';
import { categoryCreateDto } from '../dtos';

export default {
    path: '',
    description: 'Create category',
    summary: 'Create a new category',
    parameters: {
        body: joiToSwagger(categoryCreateDto).swagger,
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
