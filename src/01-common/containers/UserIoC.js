import UserService from "../../03-domain/services/UserService.js";

let userService;

const getUserService = () => {
    if (!userService) {
        userService = new UserService();
    }
    return userService;
};

export { getUserService };
