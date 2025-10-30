import 'dotenv/config';

const {
    ORIGIN_ALLOWED,
    JWT_SECRET,
    JWT_REFRESH_SECRET,
    NODEMAILER_USER,
    NODEMAILER_PASS,
    NODEMAILER_SMTP,
    NODEMAILER_PORT
} = process.env;


const config = {
    ORIGIN_ALLOWED,
    JWT_SECRET,
    JWT_REFRESH_SECRET,
    JWT_LIFETIME: 15 * 60,             // 15 minutes
    JWT_REFRESH_LIFETIME: 4 * 60 * 60, // 4 hours
    NODEMAILER_USER,
    NODEMAILER_PASS,
    NODEMAILER_SMTP,
    NODEMAILER_PORT
};

export default config;