export default {
    path: '',
    description: "List User",
    summary: "Get the list of users",
    security: {
        apiKey: []
    },
    responses: {
        200: { description: 'Success' },
        401: { description: 'Unauthorized' },
        422: { description: 'Field Error' }
    }
};