import { userCreateDto } from '../dtos/user_create.dto';
import joiToSwagger from 'joi-to-swagger';

export default {
    path: '',
    description: 'Create user',
    summary: 'Create new user',
    parameters: {
        body: joiToSwagger(userCreateDto).swagger,
    },
    responses: {
        200: { description: 'Success' },
        401: { description: 'Unauthorized' },
        422: { description: 'Field Error' },
    },
};
