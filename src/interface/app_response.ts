import { StatusCodes } from 'http-status-codes';

export interface AppResponse {
    success: boolean;
    statusCode: StatusCodes;
    data?: any;
    meta?: any;
    errors?: any;
    exception?: any;
}
