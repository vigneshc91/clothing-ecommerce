import joiToSwagger from 'joi-to-swagger';
import { productImageDeleteDto } from '../dtos';

export default {
    path: '/{productId}/image',
    description: 'Delete product image',
    summary: 'Delete the given product images',
    parameters: {
        path: {
            productId: {
                description: 'Id of the product',
                type: 'string',
                required: true
            }
        },
        body: joiToSwagger(productImageDeleteDto).swagger,
    },
    security: {
        apiKey: [],
    },
    responses: {
        204: { description: 'Success' },
        401: { description: 'Unauthorized' },
        422: { description: 'Field Error' },
    },
};
