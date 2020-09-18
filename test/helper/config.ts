import { config } from 'dotenv';
import mongoose from 'mongoose';
import { DATABASE_URI } from '../../src/config/database';
config();

export const ROOT_URL = `http://localhost:${process.env.PORT}`;
export const BASE_URL = `${ROOT_URL}/v1`;

export class Global {
    static USER: any = {};
}

export async function connectToDB() {
    await mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}
