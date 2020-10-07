export default {
    path: '/{productId}',
    description: 'Delete product',
    summary: 'Delete the given product',
    parameters: {
        path: {
            productId: {
                description: 'Id of the product',
                type: 'string',
                required: true
            }
        }
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
