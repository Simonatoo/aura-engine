import { Component } from "../core/GameObject.js";
import global from "../global/global.js";

interface SpriteConfig {
    name: string
    width?: number
    height?: number
}

class Sprite extends Component {
    config: SpriteConfig;
    sprite: HTMLImageElement | undefined;

    constructor(config:SpriteConfig) {
        super();
        this.config = config;
        this.sprite = global.getResource(this.config.name);
    }

    render(): void {
        const context: CanvasRenderingContext2D | null = global.context;

        if (!context) return;
        if (!this.sprite) return;

        const width = this.config.width ?? this.sprite.width;
        const height = this.config.height ?? this.sprite.height;

        context.drawImage(
            this.sprite,
            this.gameobject.position.x, this.gameobject.position.y,
            this.gameobject.width + width, this.gameobject.height + height);
    }
}

interface LabelConfig {
    text: string;
    font?: string;
    color?: string;
    size?: number;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
}

class Label extends Component {
    text: string;
    font: string;
    color: string;
    size: number;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;

    constructor(config: LabelConfig = { text: 'null'}) {
        super();

        this.text = config.text;
        this.font = config?.font ?? 'Arial';
        this.color = config?.color ?? 'black';
        this.size = config?.size ?? 16;
        this.textAlign = config?.textAlign ?? 'left';
        this.textBaseline = config?.textBaseline ?? 'top';
        this.gameobject.width = this.text.length + 16;
        this.gameobject.height = this.size;
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
        context.fillText(this.text, this.gameobject.position.x, this.gameobject.position.y);
    }
}

export {
    Sprite,
    Label,
}