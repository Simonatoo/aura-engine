import {Vector3} from '../math/Vector3';
import { GameObject } from './GameObject';

class PhysicManagerCore {
    objects: GameObject[];
    gravity: Vector3;
    constructor() {
        this.objects = [];
        this.gravity = new Vector3(0, 9.81, 0);
    }

    addObject(object:GameObject): void {
        this.objects.push(object);
    }

    update(deltatime:number) {
        this.objects.forEach(obj => {
            obj.physics.applyForce(this.gravity);
            obj.physics.update(deltatime);
            obj.update(deltatime);
        })
    }
}
export const PhysicManager = new PhysicManagerCore();

export class Physics {
    mass: number;
    acceleration: Vector3;
    velocity: Vector3;
    bounciness: number;
    friction: number;
    static: boolean;

    constructor() {
        this.static = false;
        this.mass = 1;
        this.bounciness = 0.1;
        this.friction = 1;
        this.acceleration = Vector3.zero();
        this.velocity = Vector3.zero();
    }

    applyForce(force:Vector3) {
        if (this.static) return;
        this.acceleration.x += force.x / this.mass;
        this.acceleration.y += force.y / this.mass;
    }

    update(deltatime:number) {
        if(this.static) return;
        this.velocity.x += this.acceleration.x * deltatime;
        this.velocity.y += this.acceleration.y * deltatime;
        // Reset acceleration
        this.acceleration = Vector3.zero(); 
    }
}