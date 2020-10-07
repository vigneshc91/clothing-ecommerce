
export default {
    path: '/{productId}/image',
    description: 'Upload product image',
    summary: 'Upload images for the given product',
    parameters: {
        path: {
            productId: {
                description: 'Id of the product',
                type: 'string',
                required: true
            }
        },
        formData: {
            image: {
                type: "file",
                required: true
            }
        }
    },
    consumes: [
        'multipart/form-data'
    ],
    security: {
        apiKey: [],
    },
    responses: {
        201: { description: 'Success' },
        401: { description: 'Unauthorized' },
        422: { description: 'Field Error' },
    },
};
