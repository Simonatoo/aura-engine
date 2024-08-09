import { SceneManager } from "./SceneManager.js";
import { Scene } from "../components/Scene.js";
import { ImageCore } from "./ResourceManager.js";
import global from "../global/global.js";
import { Input } from "../system/input.manager.js";
import { Physics } from "./Physics.js";
import { Collider2D } from "./Collision.js";
class Engine {
    constructor() {
        var _a;
        this.canvas = document.createElement("canvas");
        this.context = (_a = this.canvas.getContext("2d")) !== null && _a !== void 0 ? _a : undefined;
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
    SET_WINDOW_SIZE(width, height) {
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
    SET_WINDOW_BG(color) {
        const style = this.canvas.style;
        if (color) {
            style.background = color;
            return;
        }
        style.background = 'black';
    }
    SET_INITIAL_SCENE(sceneName) {
        this.initialScene = sceneName;
    }
    /**
     * Use this function to load each resource of your game as images, sounds, musics, etc.
     * @param resources
     */
    LOAD_RESOURCES(resources) {
        this.image.setImages(resources);
    }
    LOAD_SCENES(scenes) {
        scenes.forEach((scene) => {
            this.sceneManager.addScene(scene.name, scene.scene);
        });
    }
    RENDER() {
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
                console.log('You must set the initial scene before the render.');
                return;
            }
            this.sceneManager.switchTo(this.initialScene);
        })
            .catch((err) => {
            if (!this.initialScene) {
                console.log('You must set the initial scene before the render.');
                return;
            }
            this.sceneManager.switchTo(this.initialScene);
        });
    }
    gameLoop(timestamp) {
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
    updatePhysics(deltatime) {
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
    isEngineReady() {
        return !!this.canvas && !!this.context;
    }
    cleanCanvas() {
        var _a;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
export { Engine as Aura, Scene, global as Global, Input };
