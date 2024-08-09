import { Component } from "../core/GameObject.js";
import global from "../global/global.js";
class Sprite extends Component {
    constructor(config) {
        super();
        this.config = config;
        this.sprite = global.getResource(this.config.name);
    }
    render() {
        var _a, _b;
        const context = global.context;
        if (!context)
            return;
        if (!this.sprite)
            return;
        const width = (_a = this.config.width) !== null && _a !== void 0 ? _a : this.sprite.width;
        const height = (_b = this.config.height) !== null && _b !== void 0 ? _b : this.sprite.height;
        context.drawImage(this.sprite, this.gameobject.position.x, this.gameobject.position.y, this.gameobject.width + width, this.gameobject.height + height);
    }
}
class Label extends Component {
    constructor(config = { text: 'null' }) {
        var _a, _b, _c, _d, _e;
        super();
        this.text = config.text;
        this.font = (_a = config === null || config === void 0 ? void 0 : config.font) !== null && _a !== void 0 ? _a : 'Arial';
        this.color = (_b = config === null || config === void 0 ? void 0 : config.color) !== null && _b !== void 0 ? _b : 'black';
        this.size = (_c = config === null || config === void 0 ? void 0 : config.size) !== null && _c !== void 0 ? _c : 16;
        this.textAlign = (_d = config === null || config === void 0 ? void 0 : config.textAlign) !== null && _d !== void 0 ? _d : 'left';
        this.textBaseline = (_e = config === null || config === void 0 ? void 0 : config.textBaseline) !== null && _e !== void 0 ? _e : 'top';
        this.gameobject.width = this.text.length + 16;
        this.gameobject.height = this.size;
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
        context.fillText(this.text, this.gameobject.position.x, this.gameobject.position.y);
    }
}
export { Sprite, Label, };
