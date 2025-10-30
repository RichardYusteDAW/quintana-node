import { getUserService } from "../../01-common/containers/userIoC.js";
import { getJWTService } from "../../01-common/containers/jwtIoC.js";

/********** DEPENDENCIES **********/
const userService = getUserService();
const jwtService = getJWTService();


/********** METHODS **********/
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        await userService.login(email, password);

        const accessToken = jwtService.generateAccessToken(email);
        const refreshToken = jwtService.generateRefreshToken(email);

        res.status(200).json({ accessToken, refreshToken });

    } catch (error) {
        console.log(error);
        if (error.message === 'User not found' || error.message === 'Incorrect password')
            return res.status(401).json({ error: error.message });

        res.status(500).json({ error: 'Internal server error' });
    }
}

const refreshToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Access token is missing or malformed' });
        }
        const accessToken = authHeader.split(' ')[1];

        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ error: 'Refresh token is missing' });
        }

        let userEmail;
        try {
            userEmail = await jwtService.validateAccessToken(accessToken, { ignoreExpiration: true });
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }

        const user = await userService.findByEmail(userEmail);
        await jwtService.validateRefreshToken(refreshToken, user.email);

        const newAccessToken = jwtService.generateAccessToken(user.email);
        res.status(200).json({ accessToken: newAccessToken, refreshToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export { login, refreshToken }