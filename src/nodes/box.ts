import { GameObject } from '../core/GameObject';

export interface BoxConfig {
    width: number
    height: number
    color: string
}

export class Box extends GameObject {
    config: BoxConfig;

    constructor(config: BoxConfig) {
        super();
        this.config = config;
        this.update(0);
    }

    render(): void {
        const canvas = document.body.querySelector('canvas');
        const ctx = canvas?.getContext('2d');

        if (!ctx) return;

        ctx.fillStyle = this.config.color;
        ctx.fillRect(this.transform.position.x, this.transform.position.y,
            this.config.width, this.config.height
        )
    }
    
    update(deltatime: number): void {
        this.transform.width = this.config.width;
        this.transform.height = this.config.height;
        this.transform.position.x += this.physics.velocity.x;
        this.transform.position.y += this.physics.velocity.y;
    }
}