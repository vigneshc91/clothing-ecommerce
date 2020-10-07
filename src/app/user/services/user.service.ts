import { AppResponse } from 'src/interface/app_response';
import { StatusCodes } from 'http-status-codes';
import { UserModel, Status, Type } from '../models/user.model';
import { hash, verify } from 'argon2';
import { getJwtToken } from '../../../util/jwt_token';
import _ from 'lodash';
import { ErrorConstants } from '../../../config/error_constants';

export class UserService {

    /**
     * Get the user by its email
     * @param email string
     * @param field string
     */
    public async getUserByEmail(email: string, field?: string): Promise<AppResponse> {
        try {
            let user: any = UserModel.findOne({ email: email });

            if (field) {
                user.select(`+${field}`);
            }

            user = await user.exec();

            if (!user) {
                return {
                    success: false,
                    errors: ErrorConstants.USER_NOT_FOUND,
                    statusCode: StatusCodes.NOT_FOUND,
                };
            }

            return {
                success: true,
                data: user,
                statusCode: StatusCodes.OK,
            };
        } catch (error) {
            return {
                success: false,
                errors: error,
                exception: error,
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * Check user credentials and provide access and refresh token if valid
     * @param data any
     */
    public async login(data: any): Promise<AppResponse> {
        try {
            let user = await this.getUserByEmail(data.email, 'password');
            if (!user.success) {
                return user;
            }
            let userData = user.data;

            if (!(await verify(userData.password, data.password))) {
                return {
                    success: false,
                    errors: ErrorConstants.INVALID_CREDENTIALS,
                    statusCode: StatusCodes.UNAUTHORIZED,
                };
            }

            userData = { ...userData.toObject(), ...getJwtToken(_.pick(userData, ['_id', 'firstName', 'lastName', 'email'])) };
            delete userData.password;

            return {
                success: true,
                data: userData,
                statusCode: StatusCodes.OK,
            };
        } catch (error) {
            return {
                success: false,
                errors: error,
                exception: error,
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * Generate new access and refresh token from the provided refresh token
     * @param email string
     */
    public async refresh(email: string): Promise<AppResponse> {
        try {
            let user = await this.getUserByEmail(email);
            if (!user.success) {
                return user;
            }
            let userData = user.data;

            userData = { ...userData.toObject(), ...getJwtToken(_.pick(userData, ['_id', 'firstName', 'lastName', 'email'])) };

            return {
                success: true,
                data: userData,
                statusCode: StatusCodes.OK,
            };
        } catch (error) {
            return {
                success: false,
                errors: error,
                exception: error,
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * Get the user info by its id
     * @param id string
     */
    public async getUserById(id: string): Promise<AppResponse> {
        try {
            const user = await UserModel.findOne({
                _id: id,
                status: { $ne: Status.DELETED },
            });

            if (!user) {
                return {
                    success: false,
                    errors: ErrorConstants.USER_NOT_FOUND,
                    statusCode: StatusCodes.NOT_FOUND,
                };
            }

            return {
                success: true,
                data: user,
                statusCode: StatusCodes.OK,
            };
        } catch (error) {
            return {
                success: false,
                errors: error,
                exception: error,
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * Update the given data of the user
     * @param data any
     * @param id string
     */
    public async updateProfile(data: any, id: string): Promise<AppResponse> {
        try {
            let user: any = await this.getUserById(id);
            if (!user.success) {
                return user;
            }
            user = user.data;

            for (const key in data) {
                user[key] = data[key];
            }

            await user.save();

            return {
                success: true,
                data: user,
                statusCode: StatusCodes.OK,
            };
        } catch (error) {
            return {
                success: false,
                errors: error,
                exception: error,
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * Update the given password of the user
     * @param data any
     * @param email string
     */
    public async changePassword(data: any, email: string): Promise<AppResponse> {
        try {
            let user: any = await this.getUserByEmail(email, 'password');
            if (!user.success) {
                return user;
            }
            user = user.data;

            if (data.oldPassword && !(await verify(user.password, data.oldPassword))) {
                return {
                    success: false,
                    errors: ErrorConstants.INVALID_OLD_PASSWORD,
                    statusCode: StatusCodes.BAD_REQUEST,
                };
            }

            user.password = await hash(data.password);
            user.save();
            user = user.toObject();
            delete user.password;

            return {
                success: true,
                data: user,
                statusCode: StatusCodes.OK,
            };
        } catch (error) {
            return {
                success: false,
                errors: error,
                exception: error,
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            };
        }
    }
}
