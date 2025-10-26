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

export { upload };