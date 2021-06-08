import NotFound from "@/assets/no-image-available.jpg";

export default (imgPath, size) => {
    if (imgPath === null) {
        return NotFound
    }

    return "https://image.tmdb.org/t/p/" + size + imgPath;
};