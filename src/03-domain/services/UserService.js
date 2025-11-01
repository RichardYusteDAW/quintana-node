import { readFile } from 'fs/promises';
import { getAbsolutePath } from '../../01-common/tools/paths.js'
import bcryptjs from 'bcryptjs';

class UserService {

    #filePath;

    constructor() {
        this.#filePath = getAbsolutePath('../../04-persistence/db/users.json');
    }

    async login(email, password) {
        const user = await this.findByEmail(email);
        //console.log(await this.hashPassword(password));

        const matchPass = await bcryptjs.compare(password, user.passwordHash);
        if (!matchPass) throw new Error("Incorrect password");
    }

    async findByEmail(email) {
        const data = await readFile(this.#filePath, 'utf-8');
        const user = JSON.parse(data);

        const foundUser = user.find(u => u.email === email);
        if (!foundUser) throw new Error("User not found");

        return foundUser;
    }

    async hashPassword(password) {
        // Generate salt with 10 iterations
        const salt = await bcryptjs.genSalt(10);
        if (!salt) throw new Error("Salt generation failed");

        // Generate hash and return it
        const hash = await bcryptjs.hash(password, salt);
        if (!hash) throw new Error("Hash generation failed");

        return hash;
    }
}

export default UserService;