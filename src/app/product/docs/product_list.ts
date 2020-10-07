import joiToSwagger from 'joi-to-swagger';
import { productListDto } from '../dtos';

export default {
    path: '',
    description: 'List product',
    summary: 'Get the list of products',
    parameters: {
        query: joiToSwagger(productListDto).swagger,
    },
    responses: {
        200: { description: 'Success' },
        401: { description: 'Unauthorized' },
        422: { description: 'Field Error' },
    },
};
