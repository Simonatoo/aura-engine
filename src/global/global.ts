import { Component, GameObject } from "../core/GameObject";

export class Global {
    canvas: HTMLCanvasElement | null;
    context: CanvasRenderingContext2D | null;
    resources: { [key: string]: HTMLImageElement };
    objects: GameObject[];

    constructor() {
        this.canvas = null;
        this.context = null;
        this.resources = {};
        this.objects = [];
    }

    setCanvas(canvas: HTMLCanvasElement): void {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    addResource(name: string, resource: HTMLImageElement): void {
        this.resources[name] = resource;
    }

    addObject(object:GameObject) {
        this.objects.push(object);
    }

    getResource(name: string): HTMLImageElement | undefined {
        const image = this.resources[name]

        if (!image) console.error(`Image ${name} doesn't exist.`);
        
        return image;
    }
}

const global = new Global();

export default global;