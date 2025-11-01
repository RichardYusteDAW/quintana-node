import { body, param } from "express-validator";
import validate from "./custom/validateMiddleware.js";

const youtubeIdRegex = /^[a-zA-Z0-9_-]{11}$/;

const videoUpdateMiddleware = [
    body("*.id")
        .matches(youtubeIdRegex).withMessage("El ID del vídeo no es válido (debe ser un ID de YouTube de 11 caracteres)"),

    body("*.name")
        .notEmpty().withMessage("El campo 'name' es obligatorio")
        .isString().withMessage("El campo 'name' debe ser un texto"),

    validate,
];

const videoDeleteMiddleware = [
    param("id")
        .matches(youtubeIdRegex).withMessage("El ID del vídeo no es válido (debe ser un ID de YouTube de 11 caracteres)"),

    validate,
];

export { videoUpdateMiddleware, videoDeleteMiddleware };
