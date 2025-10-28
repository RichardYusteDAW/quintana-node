import fs from 'fs';
import path from 'path';
import { getAbsolutePath } from '../../01-common/tools/paths.js';


class ImageService {

    #folderPath;

    constructor() {
        this.#folderPath = getAbsolutePath('../../../db/images');
    }

    async getAll() {
        if (!fs.existsSync(this.#folderPath))
            fs.mkdirSync(this.#folderPath, { recursive: true });

        return fs.readdirSync(this.#folderPath);
    }

    async updateName(oldName, newName) {
        const oldPath = path.join(this.#folderPath, oldName);
        const newPath = path.join(this.#folderPath, newName);

        if (!fs.existsSync(oldPath)) throw new Error('Archivo antiguo no encontrado');

        if (fs.existsSync(newPath)) throw new Error('Ya existe un archivo con ese nombre');

        const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
        const newExtension = path.extname(newName).slice(1).toLowerCase();
        if (!validExtensions.includes(newExtension)) {
            throw new Error('El nuevo nombre tiene una extensión no válida');
        }

        await fs.promises.rename(oldPath, newPath);
    }

    async delete(filename) {
        const filePath = path.join(this.#folderPath, filename);

        if (!fs.existsSync(filePath)) throw new Error('Archivo no encontrado');

        await fs.promises.unlink(filePath);
    }
}

export default ImageService;