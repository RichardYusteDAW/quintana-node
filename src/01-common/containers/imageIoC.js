import ImageService from "../../03-domain/services/ImageService.js";

let imageService;

const getImageService = () => {
    if (!imageService) {
        imageService = new ImageService();
    }
    return imageService;
};

export { getImageService };