import { sign } from 'jsonwebtoken';
import { JWT_SECRET_KEY, JWT_ACCESS_TOKEN_EXPIRES, JWT_ALGORITHM, JWT_REFRESH_TOKEN_EXPIRES } from '../config/jwt';

/**
 * Get the jwt token
 * @param data any
 */
export function getJwtToken(data: any): { accessToken: string; refreshToken: string } {
    return {
        accessToken: getAccessToken(data),
        refreshToken: getRefreshToken(data),
    };
}

/**
 * Generate the access token and return it
 * @param data any
 */
function getAccessToken(data: any) {
    const payload = {
        type: 'accessToken',
        subject: data._id,
        data: data,
    };
    return sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_ACCESS_TOKEN_EXPIRES, algorithm: JWT_ALGORITHM });
}

/**
 * Generate the refresh token and return it
 * @param data any
 */
function getRefreshToken(data: any) {
    const payload = {
        type: 'refreshToken',
        subject: data._id,
        data: data,
    };
    return sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_REFRESH_TOKEN_EXPIRES, algorithm: JWT_ALGORITHM });
}
