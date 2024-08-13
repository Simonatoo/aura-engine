import { SceneManager } from "./SceneManager";
import { Scene } from "../components/Scene";
import { ResourceManager } from "./ResourceManager";
import { Nodes } from "../nodes";
import { PhysicManager } from "./Physics";
import { Collider } from "./Collision";
import { GameObject } from "./GameObject";

interface CanvasConfig {
    width?: number;
    height?: number;
    backgroundColor?: string;
    scenes?: { name: string, scene: Scene }[];
    initialScene?: string;
    resources?: { name: string, path: string }[];
}

class Engine {
    private lastTimeStamp: number;
    public node: Nodes;

    constructor() {
        this.node = new Nodes();
        this.lastTimeStamp = 0;
        this.setupListeners();
        this.gameLoop = this.gameLoop.bind(this);
    }

    static start(config: CanvasConfig = {}): Engine {
        const engine = new Engine();
        engine.initializeGame(config);
        return engine;
    }

    private async initializeGame(config: CanvasConfig): Promise<void> {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext("2d");

        canvas.width = config.width ?? 800;
        canvas.height = config.height ?? 600;
        canvas.style.backgroundColor = config.backgroundColor ?? 'black';

        document.body.appendChild(canvas);

        if (config.resources) {
            await this.loadResources(config.resources);
        }

        this.setupScenes(config);
        requestAnimationFrame(this.gameLoop);
        return SceneManager.switchTo(config.initialScene ?? 'null');
    }

    private setupScenes(config: CanvasConfig): void {
        config.scenes?.forEach(scene => {
            SceneManager.addScene(scene.name, scene.scene);
        });
    }

    private setupListeners(): void {
        document.addEventListener('clearCanvas', () => this.clearCanvas)
    }

    private loadResources(resources: { name: string, path: string }[]): Promise<void> {
        ResourceManager.setImages(resources);
        return ResourceManager.loadImages();
    }

    private gameLoop(timestamp: number): void {
        const deltaTime = (timestamp - this.lastTimeStamp) / 1000;
        this.lastTimeStamp = timestamp;

        this.clearCanvas();
        SceneManager.update(deltaTime);
        this.updatePhysics(deltaTime);

        requestAnimationFrame(this.gameLoop);
    }

    private clearCanvas(): void {
        const canvas = document.body.querySelector('canvas');
        if (!canvas) return;
        const context = canvas?.getContext("2d");
        context?.clearRect(0, 0, canvas?.width, canvas?.height);
    }

    private updatePhysics(deltaTime: number): void {
        PhysicManager.update(deltaTime);

        for (let i = 0; i < PhysicManager.objects.length; i++) {
            for (let j = i + 1; j < PhysicManager.objects.length; j++) {
                const obj1 = PhysicManager.objects[i];
                const obj2 = PhysicManager.objects[j];

                if(obj1.physics.isTrigger || obj2.physics.isTrigger) {
                    return;
                }

                if (Collider.isNodesColliding(obj1, obj2)) {
                    if (Collider.isAbove(obj1, obj2)) {
                        obj1.physics.velocity.y *= -obj1.physics.bounciness;
                        obj1.physics.velocity.x *= obj1.physics.bounciness;
                        obj2.physics.velocity.x *= obj2.physics.bounciness;
                    } else {
                        obj2.physics.velocity.y *= -obj2.physics.bounciness;
                        obj1.physics.velocity.x *= -obj1.physics.bounciness;
                        obj2.physics.velocity.x *= -obj2.physics.bounciness;
                    }


                    Collider.resolveCollision(obj1, obj2);

                    const combinedFriction = (obj1.physics.friction + obj2.physics.friction) / 2;
                    obj1.physics.velocity.x *= (1 - combinedFriction * 0.1);
                    obj2.physics.velocity.x *= (1 - combinedFriction * 0.1);
                }
            }
        }
    }
    checkColliding(obj1:GameObject, obj2:GameObject): boolean {
        return Collider.isColliding(obj1, obj2);
    }
}

export {
    Engine as Aura,
    Scene,
};

