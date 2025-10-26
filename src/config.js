import 'dotenv/config';

const {
    ORIGIN_ALLOWED,
    NODEMAILER_USER,
    NODEMAILER_PASS,
    NODEMAILER_SMTP,
    NODEMAILER_PORT
} = process.env;


const config = {
    ORIGIN_ALLOWED,
    NODEMAILER_USER,
    NODEMAILER_PASS,
    NODEMAILER_SMTP,
    NODEMAILER_PORT
};

export default config;