import joiToSwagger from 'joi-to-swagger';
import { categoryListDto } from '../dtos';

export default {
    path: '',
    description: 'List category',
    summary: 'Get the list of category',
    parameters: {
        query: joiToSwagger(categoryListDto).swagger,
    },
    responses: {
        200: { description: 'Success' },
        401: { description: 'Unauthorized' },
        422: { description: 'Field Error' },
    },
};
