import VideoService from "../../03-domain/services/VideoService.js";

let videoService;

const getVideoService = () => {
    if (!videoService) {
        videoService = new VideoService();
    }
    return videoService;
};

export { getVideoService };