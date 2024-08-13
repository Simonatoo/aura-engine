import { Vector3 } from "../math/Vector3";
import { Physics } from "./Physics";

export abstract class GameObject {
    public transform!: Transform;
    public physics: Physics;
    constructor() {
        this.transform = new Transform();
        this.physics = new Physics();
    }
    abstract render(): void;
    abstract update(deltatime:number): void;
}

class Transform {
    position: Vector3;
    width: number
    height: number
    constructor() {
        this.position = Vector3.zero();
        this.width = 0;
        this.height = 0;
    }
}
