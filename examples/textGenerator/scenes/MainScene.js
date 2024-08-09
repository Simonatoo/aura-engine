import { Scene } from '../../../dist/core/Engine.js';
import { game } from '../index.js';
import { GameObject } from '../../../dist/core/Gameobject.js';
import { Sprite } from '../../../dist/components/components.js';
import { Camera } from '../../../dist/core/Camera.js';
import { Physics } from '../../../dist/core/Physics.js';

export class Main extends Scene {
    start() {
        // Getting the middle of canvas width
        const canvas = game.canvas;
        const center_of_canvas = canvas.width / 2;

        this.button = new GameObject();
        this.button.addComponent(new Sprite({
            name: 'button',
            width: 120,
            height: 50
        }));
        this.button.position = {x: 600, y: 300};

        this.button2 = new GameObject();
        this.button2.addComponent(new Sprite({
            name: 'button',
            width: 120,
            height: 50
        }));
        this.button2.position = {x: 700, y: 300};

        this.camera = new Camera();

        this.button.gravity = false;
        this.button2.gravity = false;
        Physics.addObject(this.button);
        Physics.addObject(this.button2);
    }

    update(deltatime) {
        // console.log(deltatime)
        this.button.render();
        this.button2.render();
        this.camera.applyTransform();
    }
}
