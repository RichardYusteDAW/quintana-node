import { getVideoService } from "../../01-common/containers/videoIoC.js";

/********** DEPENDENCIES **********/
const videoService = getVideoService();


/********** METHODS **********/
const getAll = async (req, res) => {
    try {
        const videos = await videoService.getAll();
        res.status(200).json(videos);

    } catch (error) {
        if (error.code === 'ENOENT')
            return res.status(200).json([]);

        res.status(500).json({ message: 'Error fetching videos' });
    }
};

const update = async (req, res) => {
    try {
        const videos = req.body;
        await videoService.update(videos);

        res.status(204).json(videos);

    } catch (error) {
        res.status(500).json({ message: 'Error updating videos' });
    }
};

const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        await videoService.delete(id);

        res.status(204).send();

    } catch (error) {
        if (error.code === 'ENOENT')
            return res.status(404).json({ message: 'Archivo de vídeos no encontrado' });

        if (error.message === 'Vídeo no encontrado')
            return res.status(404).json({ message: 'Vídeo no encontrado' });

        res.status(500).json({ message: 'Error deleting video' });
    }
};


export { getAll, update, deleteVideo };