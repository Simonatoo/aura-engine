export class Global {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.resources = {};
        this.objects = [];
    }
    setCanvas(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }
    addResource(name, resource) {
        this.resources[name] = resource;
    }
    addObject(object) {
        this.objects.push(object);
    }
    getResource(name) {
        const image = this.resources[name];
        if (!image)
            console.error(`Image ${name} doesn't exist.`);
        return image;
    }
}
const global = new Global();
export default global;
