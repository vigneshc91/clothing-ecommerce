import joiToSwagger from 'joi-to-swagger';
import { userLoginDto } from '../dtos';

export default {
    path: '/login',
    description: 'Login user',
    summary: 'Login user with email and password',
    parameters: {
        body: joiToSwagger(userLoginDto).swagger,
    },
    responses: {
        200: { description: 'Success' },
        401: { description: 'Unauthorized' },
        422: { description: 'Field Error' },
    },
};
