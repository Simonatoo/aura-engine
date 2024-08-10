import global from "../global/global";
import { SceneManager } from "./SceneManager";
import { Scene } from "../components/Scene";
import { ResourceManager } from "./ResourceManager";
import { Input } from "../system/input.manager";
import { Physics } from "./Physics";
import { Collider2D } from "./Collision";

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

    constructor() {
        this.lastTimeStamp = 0;
        this.setupListeners();
        this.gameLoop = this.gameLoop.bind(this);
    }

    static start(config: CanvasConfig = {}) {
        const engine = new Engine();
        engine.initializeGame(config);
    }

    private initializeGame(config: CanvasConfig): void {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext("2d");

        canvas.width = config.width ?? 800;
        canvas.height = config.height ?? 600;
        canvas.style.backgroundColor = config.backgroundColor ?? 'black';

        document.body.appendChild(canvas);

        if (!config.initialScene) {
            return console.error('You need to set an initial scene before rendering the canvas.');
        }

        this.setupScenes(config);
        
        if (config.resources) {
            this.loadResources(config.resources).then(() => {
                SceneManager.switchTo(config.initialScene ?? '');
                requestAnimationFrame(this.gameLoop);
            }).catch((err) => {
                console.error('Failed to load resources.', err);
            });
        } else {
            SceneManager.switchTo(config.initialScene ?? '');
            requestAnimationFrame(this.gameLoop);
        }
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
        context?.clearRect(0,0, canvas?.width, canvas?.height);
    }

    private updatePhysics(deltaTime: number): void {
        Physics.update(deltaTime);

        for (let i = 0; i < Physics.object_list.length; i++) {
            for (let j = i + 1; j < Physics.object_list.length; j++) {
                const obj1 = global.objects[i];
                const obj2 = global.objects[j];

                if (Collider2D.isObjectsColliding(obj1, obj2)) {
                    console.log('Collision detected:', obj1, obj2);
                }
            }
        }
    }
}

export {
    Engine as Aura,
    Scene,
    global as Global,
};

