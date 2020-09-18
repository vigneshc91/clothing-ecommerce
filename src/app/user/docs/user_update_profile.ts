import { userUdateProfileDto } from '../dtos/user_update_profile.dto';
import joiToSwagger from 'joi-to-swagger';

export default {
    path: '/me',
    description: 'Update user',
    summary: 'Update the profile details of the user',
    parameters: {
        body: joiToSwagger(userUdateProfileDto).swagger,
    },
    security: {
        apiKey: [],
    },
    responses: {
        200: { description: 'Success' },
        401: { description: 'Unauthorized' },
        422: { description: 'Field Error' },
    },
};
