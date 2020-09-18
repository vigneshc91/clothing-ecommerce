import { Logger } from './logger';
import moment from 'moment';
import { mail, MAIL_FROM_EMAIL } from '../config/mail';
import { Options } from 'nodemailer/lib/mailer';

/**
 * Send the mail to the given email
 * @param to string
 * @param subject string
 * @param template string 
 * @param data any
 */
export async function sendMail(to: string, subject: string, template: string, data?: any) {
    try {
        data.year = moment().year();

        const info = await mail.sendMail({
            from: MAIL_FROM_EMAIL,
            to: to,
            subject: subject,
            template: template,
            context: data,
        } as Options);

        Logger.info(`Email sent to ${to} ${JSON.stringify(info)}`, 'MAIL');
    } catch (error) {
        Logger.error(error, 'MAIL');
    }
}
