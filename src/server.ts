import express from 'express';
import { config } from 'dotenv';
const env = config();
import { Logger } from './util/logger';
export const app = express();

import './app/app';

if (env.error) {
    Logger.error('.env file not found', 'SERVER');
    process.exit(1);
}

const port = process.env.PORT;

app.listen(port, () => {
    Logger.info(`Application is running on the port ${port}`, 'SERVER');
});
