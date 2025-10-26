import { getEmailService } from '../../01-common/containers/emailIoC.js';

/********** DEPENDENCIES **********/
const emailService = getEmailService();


/********** METODOS **********/
const sendEmail = async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;

        const xff = req.headers['x-forwarded-for'];
        let ip = Array.isArray(xff)
            ? xff[0]
            : typeof xff === 'string'
                ? xff.split(',')[0].trim()
                : req.socket?.remoteAddress || 'desconocida';
        if (typeof ip === 'string') ip = ip.replace(/^::ffff:/, '');

        const userAgent = req.headers['user-agent'] || 'desconocido';

        await emailService.sendEmail({ name, phone, email, message, ip, userAgent });
        res.status(202).json({ message: 'Email sent successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error sending email' });
    }
};

export { sendEmail };