import { check } from "express-validator";
import validate from "./custom/validateMiddleware.js";

const loginMiddleware = [
    check('email', "Email is required")
        .trim()
        .not().isEmpty(),

    check('email', "Invalid email").isEmail(),

    check('password', "Password is required")
        .trim()
        .not().isEmpty(),

    validate
]

export { loginMiddleware };