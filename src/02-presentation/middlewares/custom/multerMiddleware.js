import multer from 'multer';
import { getAbsolutePath } from '../../../01-common/tools/paths.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, getAbsolutePath('../../../images')),
    filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage });
const multerMiddleware = upload.single('image');

export { multerMiddleware };