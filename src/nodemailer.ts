import nodemailer from 'nodemailer';

export const mailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    port: 587,
    secure: false,
    auth: {
        user: process.env.NO_REPLY_EMAIL,
        pass: process.env.NO_REPLY_PASS,
    },
    debug: true,
});