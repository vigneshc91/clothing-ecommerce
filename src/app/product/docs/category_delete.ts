export default {
    path: '/{categoryId}',
    description: 'Delete category',
    summary: 'Delete the given category',
    parameters: {
        path: {
            categoryId: {
                description: 'Id of the category',
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
