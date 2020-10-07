import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { ResponseHandler } from '../../../util/response_handler';
import { ApiOperationGet, ApiPath, ApiOperationPost, ApiOperationPatch, ApiOperationPut } from 'swagger-express-typescript';
import { userLogin, userProfile, userRefreshToken, userUpdateProfile, userChangePassword } from '../docs';
import autoBind from 'auto-bind';

@ApiPath({
    path: '/users',
    name: 'User',
})
export class UserController extends ResponseHandler {
    private service: UserService;

    constructor() {
        super();
        autoBind(this);
        this.service = new UserService();
    }

    @ApiOperationGet(userProfile)
    public async getProfile(req: any, res: Response, next: NextFunction) {
        try {
            const data = await this.service.getUserByEmail(req.decodedToken.data.email);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }

    @ApiOperationPost(userLogin)
    public async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.login(req.body);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }

    @ApiOperationPost(userRefreshToken)
    public async refresh(req: any, res: Response, next: NextFunction) {
        try {
            const data = await this.service.refresh(req.decodedToken.data.email);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }

    @ApiOperationPut(userUpdateProfile)
    public async updateProfile(req: any, res: Response, next: NextFunction) {
        try {
            const data = await this.service.updateProfile(req.body, req.decodedToken.subject);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }

    @ApiOperationPatch(userChangePassword)
    public async changePassword(req: any, res: Response, next: NextFunction) {
        try {
            const data = await this.service.changePassword(req.body, req.decodedToken.data.email);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }
}
