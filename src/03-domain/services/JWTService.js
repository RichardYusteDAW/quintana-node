import jwt from 'jsonwebtoken';
import config from '../../config.js';

class JWTService {

    generateAccessToken(email) {
        try {
            return jwt.sign({ email }, config.JWT_SECRET, { expiresIn: config.JWT_LIFETIME });
        } catch (error) {
            throw error;
        }
    }

    generateRefreshToken(email) {
        try {
            return jwt.sign({ email }, config.JWT_REFRESH_SECRET, { expiresIn: config.JWT_REFRESH_LIFETIME });
        } catch (error) {
            throw error;
        }
    }

    async validateAccessToken(token, options) {
        if (!token) throw new Error("Access token is required");

        try {
            const payload = jwt.verify(token, config.JWT_SECRET, options);
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
            const payload = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);

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