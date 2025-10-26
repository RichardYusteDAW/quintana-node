import express from 'express';
import appMiddleware from './src/02-presentation/middlewares/custom/appMiddleware.js';

const app = express();
appMiddleware(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});