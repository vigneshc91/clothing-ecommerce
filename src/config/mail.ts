import { createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { resolve } from 'path';
const hbs = require('nodemailer-express-handlebars');

export const MAIL_FROM_EMAIL = process.env.MAIL_FROM_EMAIL || 'dev@example.com';

export const mail = createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
} as SMTPTransport.Options);

mail.use(
    'compile',
    hbs({
        viewEngine: {
            extName: '.hbs',
            defaultLayout: 'layout.hbs',
            layoutsDir: resolve('./src/resources/email/layout'),
            partialsDir: resolve('./src/resources/email/view'),
        },
        viewPath: resolve('./src/resources/email/view'),
        extName: '.hbs',
    })
);
