import { PhysicObject } from "../core/Physics.js";
import global from "../global/global.js";
import { Vector2 } from "../math/vector.js";

interface LabelConfig {
    text: string;
    position: Vector2;
    font?: string;
    color?: string;
    size?: number;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
}

class Label extends PhysicObject {
    text: string;
    font: string;
    color: string;
    size: number;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;

    constructor(config: LabelConfig = { text: 'null', position: new Vector2(0, 0) }) {
        super(config.position);

        this.text = config.text;
        this.font = config?.font ?? 'Arial';
        this.color = config?.color ?? 'black';
        this.size = config?.size ?? 16;
        this.textAlign = config?.textAlign ?? 'left';
        this.textBaseline = config?.textBaseline ?? 'top';
    }

    private applyStyle(context: CanvasRenderingContext2D): void {
        context.font = `${this.size}px ${this.font}`;
        context.fillStyle = this.color;
        context.textAlign = this.textAlign;
        context.textBaseline = this.textBaseline;
    }

    render(): void {
        const context = global.context;
        if (!context) return;

        this.applyStyle(context);
        context.fillText(this.text, this.position.x, this.position.y);
    }
}

class Sprite extends PhysicObject {
    name: string;
    position: Vector2;

    constructor(name: string, position: Vector2) {
        super((position || { x: 0, y: 0 }));
        this.name = name;
        this.position = position || { x: 0, y: 0 };
    }

    /** Use this function to render it on the current scene. */
    public render() {
        const sprite = global.getResource(this.name);
        if (!sprite) {
            console.error(`Sprite ${this.name} doesn't exist.`);
            return;
        }
        global.context?.drawImage(sprite, this.position.x, this.position.y);
    }
}

export {
    Label,
    Sprite
}
