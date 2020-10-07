import joiToSwagger from 'joi-to-swagger';
import { categoryUpdateDto } from '../dtos';

export default {
    path: '/{categoryId}',
    description: 'Update category',
    summary: 'Update the details of the category',
    parameters: {
        path: {
            categoryId: {
                description: 'Id of the category',
                type: 'string',
                required: true
            }
        },
        body: joiToSwagger(categoryUpdateDto).swagger,
    },
    security: {
        apiKey: [],
    },
    responses: {
        200: { description: 'Success' },
        401: { description: 'Unauthorized' },
        422: { description: 'Field Error' },
    },
};
