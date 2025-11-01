import { getUserService } from "../../../01-common/containers/userIoC.js";
import { getJWTService } from "../../../01-common/containers/jwtIoC.js";

/********** DEPENDENCIES **********/
const userService = getUserService();
const jwtService = getJWTService();


/********** MIDDLEWARE **********/
const jwtMiddleware = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer '))
            return res.status(401).json({ jwt: "Access token is missing or malformed" });


        const token = authHeader.split(' ')[1];
        const email = await jwtService.validateAccessToken(token);

        await userService.findByEmail(email);
        next();

    } catch (error) {
        return res.status(401).json({ jwt: error.message });
    }
}

export { jwtMiddleware };