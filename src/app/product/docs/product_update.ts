import joiToSwagger from 'joi-to-swagger';
import { productUpdateDto } from '../dtos';

export default {
    path: '/{productId}',
    description: 'Update product',
    summary: 'Update the details of the product',
    parameters: {
        path: {
            productId: {
                description: 'Id of the product',
                type: 'string',
                required: true
            }
        },
        body: joiToSwagger(productUpdateDto).swagger,
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
