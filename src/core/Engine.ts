import { SceneManager } from "./SceneManager.js";
import { Scene } from "../components/Scene.js";
import { ImageCore } from "./ResourceManager.js";
import { State } from "../global/State.js";
import global from "../global/global.js";
import { Input } from "../system/input.manager.js";
import { Physics } from "./Physics.js";
import { Camera } from "./Camera.js";
import { Collider2D } from "./Collision.js";

class Engine {
    // Canvas
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | undefined;

    // Variables
    initialScene: string | null;

    // Loopsets
    lastTimeStamp: number;

    // Imports
    sceneManager: SceneManager;
    image: ImageCore;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d") ?? undefined;
        this.initialScene = null;
        this.lastTimeStamp = 0;
        this.sceneManager = new SceneManager();
        this.image = new ImageCore();

        // Canvas default setup
        this.SET_WINDOW_BG();

        // GameLoop
        this.gameLoop = this.gameLoop.bind(this);

        // Add event listener for clearCanvas
        document.addEventListener('clearCanvas', () => {
            this.cleanCanvas();
        });

        // Initial render and start game loop
        requestAnimationFrame(this.gameLoop);
    }

    public SET_WINDOW_SIZE(width: number, height: number): void {
        if (!this.isEngineReady()) {
            console.error('Impossible to set window size.');
            return;
        }

        this.canvas.width = width;
        this.canvas.height = height;
    }

    /**
     * The window color by default is black.
     * @param color 
     */
    public SET_WINDOW_BG(color?: string): void {
        const style = this.canvas.style;
        if (color) {
            style.background = color;
            return;
        }
        style.background = 'black';
    }

    public SET_INITIAL_SCENE(sceneName: string): void {
        this.initialScene = sceneName;
    }

    /**
     * Use this function to load each resource of your game as images, sounds, musics, etc. 
     * @param resources 
     */
    public LOAD_RESOURCES(resources: { name: string, path: string }[]): void { 
        this.image.setImages(resources);
    }

    public LOAD_SCENES(scenes: { name: string, scene: Scene}[]): void {
        scenes.forEach((scene) => {
            this.sceneManager.addScene(scene.name, scene.scene);
        });
    }

    public RENDER(): void {
        if (!this.isEngineReady()) {
            console.error(`Canvas hasn't created.`);
            return;
        }

        if (!this.initialScene) {
            console.error(`You must set the initial scene before the render.`);
            return;
        }

        global.setCanvas(this.canvas);
        document.body.appendChild(this.canvas);

        if (this.image.crude_images.size == 0) {
            this.sceneManager.switchTo(this.initialScene);
            return;
        }

        this.image.loadImages()
            .then(() => {
                if (!this.initialScene) {
                    console.log('You must set the initial scene before the render.')
                    return;
                }
                this.sceneManager.switchTo(this.initialScene);
            })
            .catch((err) => {
                if (!this.initialScene) {
                    console.log('You must set the initial scene before the render.')
                    return;
                }
                this.sceneManager.switchTo(this.initialScene);
            });
    }

    private gameLoop(timestamp: number): void {
        // Dispatch the clearCanvas event
        const clearEvent = new CustomEvent('clearCanvas');
        document.dispatchEvent(clearEvent);

        if (timestamp === 0) {
            timestamp = this.lastTimeStamp;
        }

        const deltaTime = (timestamp - this.lastTimeStamp) / 1000;
        this.sceneManager.update(deltaTime);
        this.lastTimeStamp = timestamp;

        this.updatePhysics(deltaTime);

        requestAnimationFrame(this.gameLoop);
    }

    private updatePhysics(deltatime: number): void {
    Physics.update(deltatime);
    
    for (let i = 0; i < Physics.object_list.length; i++) {
        for (let j = i + 1; j < Physics.object_list.length; j++) {
            const obj1 = global.objects[i];
            const obj2 = global.objects[j];

            console.log(obj1, obj2);
            
            if (Collider2D.isObjectsColliding(obj1, obj2)) {
                console.log('Is colliding');
            }
        }
    }
}


    private isEngineReady(): boolean {
        return !!this.canvas && !!this.context;
    }

    private cleanCanvas(): void {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export {
    Engine as Aura,
    Scene,
    global as Global,
    Input    
};

