import global from "../global/global.js";
import { Vector2 } from "../math/vector.js";

class Camera {
    context: CanvasRenderingContext2D | null;
    position: Vector2;
    zoom: number;

    constructor(position = new Vector2(0,0), zoom = 1) {
        this.context = global.context;
        this.position = position;
        this.zoom = zoom;
    }

    applyTransform(): void {
        this.context?.setTransform(
            this.zoom,
            0,
            0,
            this.zoom,
            -this.position.x * this.zoom,
            -this.position.y * this.zoom,
        );
    }

    resetTransform(): void {
        this.context?.setTransform(1,0,0,1,0,0);
    }

    move(dx:number, dy:number): void {
        this.position.x = dx;
        this.position.y = dy;
    }

    setZoom(zoom:number): void {
        this.zoom = zoom;
    }
}

export {
    Camera
}