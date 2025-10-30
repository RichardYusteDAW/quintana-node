import { readFile } from 'fs/promises';
import { getAbsolutePath } from '../../01-common/tools/paths.js'
import bcryptjs from 'bcryptjs';

class UserService {

    #userPath;

    constructor() {
        this.#userPath = getAbsolutePath('../../../db/users.json');
    }

    async login(email, password) {
        const user = await this.findByEmail(email);

        const matchPass = await bcryptjs.compare(password, user.passwordHash);
        if (!matchPass) throw new Error("Incorrect password");
    }

    async findByEmail(email) {
        const data = await readFile(this.#userPath, 'utf-8');
        const user = JSON.parse(data);

        const foundUser = user.find(u => u.email === email);
        if (!foundUser) throw new Error("User not found");

        return foundUser;
    }
}

export default UserService;