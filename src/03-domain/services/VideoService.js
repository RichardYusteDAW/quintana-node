import { readFile, writeFile } from 'fs/promises';
import { getAbsolutePath } from '../../01-common/tools/paths.js'

class VideoService {

    #filePath;

    constructor() {
        this.#filePath = getAbsolutePath('../../../db/videos.json');
    }

    async getAll() {
        const data = await readFile(this.#filePath, 'utf-8');

        return JSON.parse(data);
    }

    async update(videos) {
        await writeFile(this.#filePath, JSON.stringify(videos, null, 2), 'utf-8');
    }

    async delete(videoId) {
        const videos = await this.getAll();
        const index = videos.findIndex(video => video.id === videoId);
        if (index === -1) throw new Error('Vídeo no encontrado');

        videos.splice(index, 1);
        await this.update(videos);
    }
}

export default VideoService;