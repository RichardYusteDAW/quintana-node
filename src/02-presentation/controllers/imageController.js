import fs from 'fs';
import { getAbsolutePath } from '../../01-common/tools/paths.js';

const getAll = async (req, res) => {
    try {
        const folderPath = getAbsolutePath('../../../images');

        // Si la carpeta no existe, la creamos
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        // Leer los archivos de la carpeta
        const files = fs.readdirSync(folderPath);

        // Construir URLs absolutas (para usarlas directamente en el front)
        const baseUrl = `${req.protocol}://${req.get('host')}/images`;
        const images = files.map(filename => ({
            filename,
            url: `${baseUrl}/${filename}`
        }));

        res.status(200).json(images);

    } catch (err) {
        res.status(500).json({ message: 'Error al listar las imágenes' });
    }
};

const upload = async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ message: 'No se ha subido ningún archivo' });


        res.status(201).json({ message: 'Imagen subida correctamente', file: req.file });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error al subir la imagen' });
    }
};

export { getAll, upload };