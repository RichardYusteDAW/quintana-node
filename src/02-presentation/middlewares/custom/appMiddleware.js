import express from 'express';
import cors from 'cors';

import config from '../../../config.js';
import router from '../../../02-presentation/routes/router.js';

const appMiddleware = (app) => {
    const { ORIGIN_ALLOWED } = config;

    app.use(cors({
        origin: JSON.parse(ORIGIN_ALLOWED),
        credentials: true
    }));

    app.use(express.json());
    app.use('/api', router);
};

export default appMiddleware;