import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validate } from '../../../middleware/validate';
import { authenticate } from '../../../middleware/auth';
import { userChangePasswordDto, userLoginDto, userUdateProfileDto } from '../dtos';

export const userRouter = Router();
const userController = new UserController();

userRouter.get('/me', authenticate, userController.getProfile);
userRouter.post('/login', [validate(userLoginDto)], userController.loginUser);
userRouter.post('/refresh', authenticate, userController.refresh);
userRouter.put('/me', [authenticate, validate(userUdateProfileDto)], userController.updateProfile);
userRouter.patch('/change-password', [authenticate, validate(userChangePasswordDto)], userController.changePassword);
