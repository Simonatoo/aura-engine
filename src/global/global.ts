export class Global {
    canvas: HTMLCanvasElement | null;
    context: CanvasRenderingContext2D | null;
    resources: { [key: string]: HTMLImageElement };

    constructor() {
        this.canvas = null;
        this.context = null;
        this.resources = {};
    }

    setCanvas(canvas: HTMLCanvasElement): void {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    addResource(name: string, resource: HTMLImageElement): void {
        this.resources[name] = resource;
    }

    getResource(name: string): HTMLImageElement | undefined {
        const image = this.resources[name]

        if (!image) console.error(`Image ${name} doesn't exist.`);
        
        return image;
    }
}

const global = new Global();

export default global;