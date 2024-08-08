import global from "../global/global.js";
import { State } from "../global/State.js";

export class PhysicEngine {
    object_list: PhysicObject[];
    gravity: { x: number, y: number };

    constructor() {
        this.gravity = { x: 0, y: 9.18 };
        this.object_list = [];
    }

    addObject(object: PhysicObject) {
        this.object_list.push(object);
    }

    update(deltatime: number) {
        this.object_list.forEach((obj) => {
            obj.applyForce(this.gravity);
            obj.update(deltatime);
        })
    }
}


export class PhysicObject {
    position: { x: number, y: number };
    velocity: { x: number, y: number };
    aceleration: { x: number, y: number };
    mass: number;

    constructor(position: { x: number, y: number }, mass = 1) {
        this.position = position;
        this.velocity = { x: 0, y: 0 };
        this.aceleration = { x: 0, y: 0 };
        this.mass = mass;
    }

    applyForce(force: { x: number, y: number }) {
        this.aceleration.x += force.x / this.mass;
        this.aceleration.y += force.y / this.mass;
    }

    update(deltatime: number) {
        this.velocity.x += this.aceleration.x * deltatime;
        this.velocity.y += this.aceleration.y * deltatime;

        this.position.x += this.velocity.x * deltatime;
        this.position.y += this.velocity.y * deltatime;

        this.aceleration.x = 0;
        this.aceleration.y = 0;
    }
}

interface objectConfig {
    position: { x: number, y: number };
    mass: number;
    width: number;
    height: number;
    color: string;
}

export class Box extends PhysicObject {
    position: { x: number; y: number; };
    width: number
    height: number
    color: string

    constructor(config: objectConfig) {
        super(config.position, config.mass);
        this.position = config.position;
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
    }

    draw() {
        const context = global.context;
        if (!context) return;
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Render {
    image(name:string, x:number, y:number) {
        const context = global.context;
        const image = global.getResource(name);
        const obj = new PhysicObject({x,y})
        if (!image) {
            return console.error(`Image ${name} doesn't exist.`)
        }
        context?.drawImage(image, x, y);
        return obj
    }
}


class Image extends PhysicObject {
    position: { x: number; y: number; };
    width: number
    height: number
    color: string

    constructor(config: objectConfig) {
        super(config.position, config.mass);
        this.position = config.position;
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
    }

    draw(name:string, x:number, y:number) {
        const context = global.context;
        const image = global.getResource(name);

        if (!context) return;
        if (!image) return console.error(`Failed to load image ${name}`);

        context.drawImage(image, x, y);
    }
}

const render = new Render();

export {
    render as Render,
}
