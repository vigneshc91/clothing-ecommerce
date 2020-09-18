import { UserModel, Type } from '../../src/app/user/models/user.model';
import admin from '../data/admin.json';
import { Logger } from '../../src/util/logger';
import { hash } from 'argon2';
import { getSHA512Hash } from '../../src/util/helper';

const data: any = admin;

export default class AdminSeeder {
    async run() {
        try {
            const isAdminExist = await UserModel.countDocuments({ type: Type.ADMIN });
            if (isAdminExist) {
                Logger.info('Admin already exist', 'SEED');
                return false;
            }
            data.password = await hash(getSHA512Hash(data.password));
            await UserModel.create(data);
            Logger.info('Admin seeded successfully', 'SEED');
            return true;
        } catch (error) {
            Logger.error(error, 'SEED');
            return false;
        }
    }
}
