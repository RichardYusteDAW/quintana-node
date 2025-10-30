import JWTService from "../../03-domain/services/JWTService";

let jwtService;

const getJWTService = () => {
    if (!jwtService) {
        jwtService = new JWTService();
    }
    return jwtService;
};

export { getJWTService };