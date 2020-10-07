import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';

/**
 * Validate the given schema with data
 * @param schema any
 */
export function validate(schema: any) {
    return function (req: Request, res: Response, next: NextFunction) {
        const data = req.method === 'GET' ? req.query : req.body;
        const { error, value } = schema.validate(data, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: getErrorObject(error) });
        } else {
            if (req.method === 'GET') {
                req.query = value;
            } else {
                req.body = value;
            }
            return next();
        }
    };
}

/**
 * Return the modified error object
 * @param error any
 */
function getErrorObject(error: any) {
    let errorObject = {};
    if (error.details && error.details.length) {
        error.details.forEach((element: any) => {
            if (!_.has(errorObject, element.path)) {
                _.set(errorObject, element.path, element.message);
            }
        });
    }
    return errorObject;
}
