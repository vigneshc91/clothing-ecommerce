import { initializeApp, credential, messaging } from 'firebase-admin';
import { resolve } from 'path';

initializeApp({
    credential: credential.cert(resolve(`./src/resources/fcm/${process.env.NODE_ENV}.json`)),
    databaseURL: process.env.FCM_DATABASE_URL,
});

export const fcm: any = messaging();