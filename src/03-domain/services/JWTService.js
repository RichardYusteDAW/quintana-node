import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_LIFETIME, JWT_REFRESH_SECRET, JWT_REFRESH_LIFETIME } from '../../config.js';

class JWTService {

    generateAccessToken(email) {
        try {
            return jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_LIFETIME });
        } catch (error) {
            throw error;
        }
    }

    generateRefreshToken(email) {
        try {
            return jwt.sign({ email }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_LIFETIME });
        } catch (error) {
            throw error;
        }
    }

    async validateAccessToken(token, options) {
        if (!token) throw new Error("Access token is required");

        try {
            const payload = jwt.verify(token, JWT_SECRET, options);
            return payload.email;
        } catch (error) {
            if (error.name === 'TokenExpiredError')
                throw new Error('Access token expired');
            throw new Error('Invalid access token');
        }
    }

    async validateRefreshToken(refreshToken, userEmail) {
        if (!refreshToken) throw new Error("Refresh token is required");

        try {
            const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

            if (payload.email !== userEmail) throw new Error();

            return payload.email;

        } catch (error) {
            if (error.name === 'TokenExpiredError')
                throw new Error('Refresh token expired');
            throw new Error("Invalid refresh token");
        }
    }
}

export default JWTService;