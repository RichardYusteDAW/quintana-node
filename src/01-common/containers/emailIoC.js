import EmailService from "../../03-domain/services/EmailService.js";


let emailService;

const getEmailService = () => {
    if (!emailService) {
        emailService = new EmailService();
    }
    return emailService;
}

export { getEmailService };