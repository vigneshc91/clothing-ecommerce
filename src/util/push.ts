import { Logger } from './logger';
import { fcm } from '../config/fcm';

/**
 * Send the FCM push notification to the given token
 * @param token string | string[]
 * @param body string
 * @param data any
 * @param device any
 */
export async function sendPush(token: string | string[], body: string, data?: any, device?: any) {
    try {
        let method = 'send';

        let message: any = {
            notification: {
                title: 'App',
                body: body,
            },
        };

        if (token instanceof Array) {
            method = 'sendMulticast';
            message.tokens = token;
        } else {
            message.token = token;
        }

        if (device === 'IOS') {
            message['apns'] = {
                payload: {
                    aps: {
                        'content-available': 1,
                        data: data,
                    },
                },
            };
        } else {
            message.data = data;
        }

        fcm[method](message)
            .then((res: any) => {
                Logger.info(`Push notification sent successfully ${JSON.stringify(res)}`, 'FCM');
            })
            .catch((err: any) => {
                Logger.error(err, 'FCM');
            });
    } catch (error) {
        Logger.error(error, 'FCM');
    }
}
