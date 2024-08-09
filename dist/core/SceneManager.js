export class SceneManager {
    constructor() {
        this.scenes = new Map();
        this.currentScene = null;
    }
    addScene(name, scene) {
        if (name == '' || scene == null) {
            console.error();
            return;
        }
        this.scenes.set(name, scene);
        // DEBUG
        console.log('Scene was added.');
    }
    update(timestamp) {
        if (!this.currentScene)
            return;
        this.currentScene.update(timestamp);
    }
    switchTo(name) {
        const newScene = this.scenes.get(name);
        this.currentScene = newScene;
        // DEBUG
        console.log("Scene was changed.");
        if (this.currentScene) {
            this.currentScene.start();
        }
    }
    /**
     *
     * @returns List of added scenes.
     */
    getScenes() {
        return this.scenes;
    }
}
