import { Component } from "../core/GameObject";
import global from "../global/global";

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
        const canvas = document.body.querySelector('canvas')
        const context = canvas?.getContext("2d");

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
    text?: string;
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

    constructor(config: LabelConfig ) {
        super();

        this.text = config.text ?? 'null';
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
        const context = document.body.querySelector('canvas')?.getContext("2d");
        if (!context) return;

        this.gameobject.width = this.text.length + 16;
        this.gameobject.height = this.size;

        this.applyStyle(context);
        context.fillText(this.text, this.gameobject.position.x, this.gameobject.position.y);
    }
}

export {
    Sprite,
    Label,
}