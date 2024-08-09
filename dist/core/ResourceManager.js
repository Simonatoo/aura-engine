import global from "../global/global.js";
export class ImageCore {
    constructor() {
        this.crude_images = new Map();
        this.rendered_images = new Map();
    }
    setImages(resources) {
        resources.forEach((img) => {
            this.crude_images.set(img.name, img.path);
        });
    }
    loadImages() {
        const promises = Array.from(this.crude_images.entries()).map(([name, path]) => {
            return new Promise((res, rej) => {
                const img = new Image();
                img.onload = () => {
                    res();
                };
                img.onerror = () => {
                    rej(console.error('Fail to load image: ' + name));
                };
                img.src = path;
                global.addResource(name, img);
            });
        });
        return Promise.all(promises).then(() => undefined);
    }
}
