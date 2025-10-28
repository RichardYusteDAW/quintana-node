import { getImageService } from "../../01-common/containers/imageIoC.js";

/********** DEPENDENCIES **********/
const imageService = getImageService();

const getAll = async (req, res) => {
    try {
        const files = await imageService.getAll();
        const baseUrl = `${req.protocol}://${req.get('host')}/images`;
        const images = files.map(filename => ({
            name: filename,
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

const updateName = async (req, res) => {
    try {
        const { oldName, newName } = req.body;
        await imageService.updateName(oldName, newName);

        return res.status(200).json({ message: 'Nombre de imagen actualizado correctamente' });

    } catch (error) {
        if (error.message === 'Archivo antiguo no encontrado')
            return res.status(404).json({ message: error.message });

        if (error.message === 'Ya existe un archivo con ese nombre')
            return res.status(400).json({ message: error.message });


        if (error.message === 'El nuevo nombre tiene una extensión no válida')
            return res.status(400).json({ message: error.message });

        return res.status(500).json({ message: 'Error al actualizar el nombre de la imagen' });
    }
};

const deleteImage = async (req, res) => {
    try {
        const { filename } = req.query;
        await imageService.delete(filename);

        return res.status(200).json({ message: 'Imagen eliminada correctamente' });

    } catch (error) {
        if (error.message === 'Archivo no encontrado') {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Error al eliminar la imagen' });
    }
};

export { getAll, upload, updateName, deleteImage };