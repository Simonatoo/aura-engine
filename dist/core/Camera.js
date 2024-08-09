import global from "../global/global.js";
import { Vector2 } from "../math/vector.js";
class Camera {
    constructor(position = new Vector2(0, 0), zoom = 1) {
        this.context = global.context;
        this.position = position;
        this.zoom = zoom;
    }
    applyTransform() {
        var _a;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.setTransform(this.zoom, 0, 0, this.zoom, -this.position.x * this.zoom, -this.position.y * this.zoom);
    }
    resetTransform() {
        var _a;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.setTransform(1, 0, 0, 1, 0, 0);
    }
    move(dx, dy) {
        this.position.x = dx;
        this.position.y = dy;
    }
    setZoom(zoom) {
        this.zoom = zoom;
    }
}
export { Camera };
