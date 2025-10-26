import { check } from 'express-validator';
import validate from './custom/validateMiddleware.js';

const emailMiddleware = [
    check('name')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 100 }).withMessage('El nombre es demasiado largo'),

    check('phone')
        .trim()
        .isMobilePhone('es-ES').withMessage('El teléfono no es válido'),

    check('email')
        .trim()
        .isEmail().withMessage('El email no es válido')
        .isLength({ max: 254 }).withMessage('El email es demasiado largo'),

    check('message')
        .trim()
        .notEmpty().withMessage('El mensaje es obligatorio')
        .isLength({ max: 2000 }).withMessage('El mensaje no puede superar 2000 caracteres'),

    validate
];

export { emailMiddleware };