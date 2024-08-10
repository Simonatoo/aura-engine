import { Label, Sprite } from "../src/components";
import { Aura, Scene } from "../src/core/Engine";
import { GameObject } from "../src/core/GameObject";
import { Vector2 } from "../src/math/vector";


function gameScene() {
    const title = new Label({
        text: 'Hello, world'
    });

    function start(): void {

    }

    function update(deltatime: number): void {
        title.render();
    }

    return {
        start,
        update,
    };
}

const game = Aura.start({
    width: 800,
    height: 600,
    backgroundColor: 'pink',
    scenes: [
        { name: 'Game', scene: gameScene() },
    ],
    initialScene: 'Game',
    resources: [
        { name: 'button', path: './button.png'},
    ]
})