import { GameObject } from '../core/GameObject';
import { Physics } from '../core/Physics';

export interface LabelConfig {
    text?: string
    color?: string
    font?: string
    size?: number
    maxWidth?: number | null,
    textAlign?: CanvasTextAlign
    textBaseline?: CanvasTextBaseline
}

export class Label extends GameObject {
    private config: LabelConfig;

    constructor(config: LabelConfig) {
        super();
        this.config = config;
    }

    render(): void {
        const canvas = document.body.querySelector('canvas');
        const ctx = canvas?.getContext('2d');

        if (!ctx) return;

        ctx.fillStyle = this.config.color ?? 'black';
        ctx.textAlign = this.config.textAlign ?? 'left';
        ctx.textBaseline = this.config.textBaseline ?? 'top';
        ctx.font = `${this.config.size}px ${this.config.font ?? 'Arial'}`;

        if (this.config.maxWidth)
            return ctx.fillText(this.config.text ?? 'null', this.transform.position.x, this.transform.position.y, this.config.maxWidth);

        ctx.fillText(this.config.text ?? 'null', this.transform.position.x, this.transform.position.y);

    }

    update(deltatime: number): void {
        this.transform.width = this.config.text?.length??0 + 16;
        this.transform.height = this.config.size??0;
        this.transform.position.x += this.physics.velocity.x;
        this.transform.position.y += this.physics.velocity.y;
    }
}