import JWTService from "../../03-domain/services/JWTService.js";

let jwtService;

const getJWTService = () => {
    if (!jwtService) {
        jwtService = new JWTService();
    }
    return jwtService;
};

export { getJWTService };