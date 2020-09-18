export default {
    path: '/me',
    description: 'User profile',
    summary: 'Get the profile details of the user',
    security: {
        apiKey: [],
    },
    responses: {
        200: { description: 'Success' },
        401: { description: 'Unauthorized' },
        422: { description: 'Field Error' },
    },
};
