export default {
    path: '/refresh',
    description: 'Refresh Access Token',
    summary: 'Generate new access and refresh token with the given refresh token',
    parameters: {},
    security: {
        apiKey: []
    },
    responses: {
        200: { description: 'Success' },
        401: { description: 'Unauthorized' },
        422: { description: 'Field Error' },
    },
};
