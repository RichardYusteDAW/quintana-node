import { check, query } from 'express-validator';
import validateNoRelativePath from './custom/validateNoRelativePathMiddleware.js';
import validate from './custom/validateMiddleware.js';


const imageUpdateMiddleware = [
    check('oldName')
        .trim()
        .notEmpty().withMessage('El nombre antiguo es obligatorio')
        .isLength({ max: 255 }).withMessage('El nombre antiguo es demasiado largo')
        .custom(validateNoRelativePath),

    check('newName')
        .trim()
        .notEmpty().withMessage('El nuevo nombre es obligatorio')
        .isLength({ max: 255 }).withMessage('El nuevo nombre es demasiado largo')
        .matches(/^[^<>:"/\\|?*\x00-\x1F]+$/).withMessage('El nuevo nombre contiene caracteres no válidos')
        .custom(validateNoRelativePath),

    validate
];

const imageDeleteMiddleware = [
    query('filename')
        .trim()
        .notEmpty().withMessage('El nombre del archivo es obligatorio')
        .isLength({ max: 255 }).withMessage('El nombre del archivo es demasiado largo')
        .custom(validateNoRelativePath),

    validate
];

export { imageUpdateMiddleware, imageDeleteMiddleware };