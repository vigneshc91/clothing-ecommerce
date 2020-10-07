export default {
    path: '/{productId}',
    description: 'Get product',
    summary: 'Get the details of the product',
    parameters: {
        path: {
            categoryId: {
                description: 'Id of the product',
                type: 'string',
                required: true
            }
        }
    },
    responses: {
        200: { description: 'Success' },
        401: { description: 'Unauthorized' },
        422: { description: 'Field Error' },
    },
};
