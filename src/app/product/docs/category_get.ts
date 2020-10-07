export default {
    path: '/{categoryId}',
    description: 'Get category',
    summary: 'Get the details of the category',
    parameters: {
        path: {
            categoryId: {
                description: 'Id of the category',
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
