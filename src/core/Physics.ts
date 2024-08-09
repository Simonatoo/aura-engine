import global from "../global/global.js";
import { State } from "../global/State.js";
import { Vector2 } from "../math/vector.js";

class PhysicEngine {
    object_list: PhysicObject[];
    gravity: { x: number, y: number };

    constructor() {
        this.gravity = { x: 0, y: 9.18 };
        this.object_list = [];
    }

    addObject(object: PhysicObject): void {
        this.object_list.push(object);
    }

    addObjects(objects: PhysicObject[]): void {
        objects.forEach(obj => {
            this.object_list.push(obj);
        })
    }

    update(deltatime: number) {
        this.object_list.forEach((obj) => {
            obj.applyForce(this.gravity);
            obj.update(deltatime);
        })
    }
}


class PhysicObject {
    position: { x: number, y: number };
    velocity: { x: number, y: number };
    aceleration: { x: number, y: number };
    gravity: boolean;
    mass: number;

    constructor(position: { x: number, y: number }, mass?: number) {
        this.position = position;
        this.velocity = { x: 0, y: 0 };
        this.aceleration = { x: 0, y: 0 };
        this.mass = mass || 1;
        this.gravity = true;
    }

    applyForce(force: { x: number, y: number }) {
        if (!this.gravity) return;
        
        this.aceleration.x += force.x / this.mass;
        this.aceleration.y += force.y / this.mass;
    }

    update(deltatime: number) {
        if (!this.gravity) return;

        this.velocity.x += this.aceleration.x * deltatime;
        this.velocity.y += this.aceleration.y * deltatime;

        this.position.x += this.velocity.x * deltatime;
        this.position.y += this.velocity.y * deltatime;

        this.aceleration.x = 0;
        this.aceleration.y = 0;
    }
}

const Physics = new PhysicEngine();

export {
    Physics,
    PhysicObject
}