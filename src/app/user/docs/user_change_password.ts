import { userChangePasswordDto } from '../dtos/user_change_password.dto';
import joiToSwagger from 'joi-to-swagger';

export default {
    path: '/change-password',
    description: 'Change Password of user',
    summary: 'Update the password of the user',
    parameters: {
        body: joiToSwagger(userChangePasswordDto).swagger,
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
