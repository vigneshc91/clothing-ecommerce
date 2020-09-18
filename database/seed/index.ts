import { config } from 'dotenv';
config();
import { Logger } from '../../src/util/logger';
import '../../src/config/database';
import AdminSeeder from './admin.seeder';

const seeders = [
    AdminSeeder
];

seeders.forEach(async (item, index, array) => {
    if (index === 0) {
        Logger.info('Seeder started', 'SEED');
    }
    await new item().run();
    if (index === array.length - 1) {
        Logger.info('Seeder completed', 'SEED');
    }
});