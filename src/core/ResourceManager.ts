import global from "../global/global";
import { State } from "../global/State";

class ResourceManager {
    crude_images: Map<string, string>;
    rendered_images: Map<string, HTMLImageElement>;

    constructor() {
        this.crude_images = new Map();
        this.rendered_images = new Map();
    }

    setImages(resources: { name: string, path: string }[]): void { 
        resources.forEach((img) => {
            this.crude_images.set(img.name, img.path);
        });
    }

    loadImages(): Promise<void> { 
        const promises = Array.from(this.crude_images.entries()).map(([name, path]) => {
            return new Promise<void>((res, rej) => {
                const img = new Image();
                img.onload = () => {
                    res();
                };
                img.onerror = () => {
                    rej(console.error('Fail to load image: ' + name));
                }
                img.src = path;
                global.addResource(name, img);
            });
        });

        return Promise.all(promises).then(() => undefined);
    }
}

const resources = new ResourceManager();

export {
    resources as ResourceManager,
}