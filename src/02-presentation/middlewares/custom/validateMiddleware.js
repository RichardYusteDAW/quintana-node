import { validationResult } from 'express-validator';

const validateMiddleware = (req, res, next) => {

    const error = validationResult(req).array().find(err => err.type === 'field');

    if (error) {
        const { path, msg } = error;
        return res.status(400).json({ [path]: msg });
    }

    next();
}

export default validateMiddleware;