import * as swagger from 'swagger-express-typescript';
import { APP_NAME, BASE_URL } from '.';

export default swagger.express({
    definition: {
        info: {
            title: `${APP_NAME} REST API`,
            version: '1.0'
        },
        basePath: BASE_URL,
        schemes: ['http', 'https'],
        securityDefinitions: {
            apiKey: {
                in: 'header',
                name: 'Authorization',
                type: 'apiKey'
            }
        }
    }
});