import { PhysicObject } from "../core/Physics.js";
import global from "../global/global.js";
import { Vector2 } from "../math/vector.js";
class Label extends PhysicObject {
    constructor(config = { text: 'null', position: new Vector2(0, 0) }) {
        var _a, _b, _c, _d, _e;
        super(config.position);
        this.text = config.text;
        this.font = (_a = config === null || config === void 0 ? void 0 : config.font) !== null && _a !== void 0 ? _a : 'Arial';
        this.color = (_b = config === null || config === void 0 ? void 0 : config.color) !== null && _b !== void 0 ? _b : 'black';
        this.size = (_c = config === null || config === void 0 ? void 0 : config.size) !== null && _c !== void 0 ? _c : 16;
        this.textAlign = (_d = config === null || config === void 0 ? void 0 : config.textAlign) !== null && _d !== void 0 ? _d : 'left';
        this.textBaseline = (_e = config === null || config === void 0 ? void 0 : config.textBaseline) !== null && _e !== void 0 ? _e : 'top';
    }
    applyStyle(context) {
        context.font = `${this.size}px ${this.font}`;
        context.fillStyle = this.color;
        context.textAlign = this.textAlign;
        context.textBaseline = this.textBaseline;
    }
    render() {
        const context = global.context;
        if (!context)
            return;
        this.applyStyle(context);
        context.fillText(this.text, this.position.x, this.position.y);
    }
}
class Sprite extends PhysicObject {
    constructor(name, position) {
        super((position || { x: 0, y: 0 }));
        this.name = name;
        this.position = position || { x: 0, y: 0 };
    }
    /** Use this function to render it on the current scene. */
    render() {
        var _a;
        const sprite = global.getResource(this.name);
        if (!sprite) {
            console.error(`Sprite ${this.name} doesn't exist.`);
            return;
        }
        (_a = global.context) === null || _a === void 0 ? void 0 : _a.drawImage(sprite, this.position.x, this.position.y);
    }
}
export { Label, };
