import { Scene } from "../components/Scene";

class SceneManager {
    scenes: any
    currentScene: Scene | null

    constructor() {
        this.scenes = new Map<string, Scene>();
        this.currentScene = null
    }

    public addScene(name: string, scene: Scene): void {
        if (name == '' || scene == null) {
            console.error();
            return;
        }
        this.scenes.set(name, scene);

        // DEBUG
        console.log('Scene was added.');
    }

    public update(timestamp: number): void {
        if (!this.currentScene)
            return
        this.currentScene.update(timestamp)
    }

    public switchTo(name: string): void {
        const newScene = this.scenes.get(name)
        this.currentScene = newScene

        // DEBUG
        console.log("Scene was changed.")

        if (this.currentScene) {
            this.currentScene.start()
        }
    }

    /**
     * 
     * @returns List of added scenes.
     */
    public getScenes(): Map<string, Scene> {
        return this.scenes
    }
}

const sceneManager = new SceneManager();

export { sceneManager as SceneManager };
