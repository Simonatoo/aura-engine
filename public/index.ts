import { Collider } from "../src/core/Collision";
import { Aura, Scene } from "../src/core/Engine";
import { PhysicManager } from "../src/core/Physics";
import { Vector3 } from "../src/math/Vector3";
import { Box } from "../src/nodes/box";
import { Label } from "../src/nodes/label";
import { Sprite } from "../src/nodes/sprite";

class Main implements Scene {
    box: Box|undefined;
    title: Label|undefined;
    floor: Box|undefined;
    button: Sprite|undefined;

    start(): void {
        PhysicManager.gravity.y = 9.81;
        this.box = game.node.box({width:100, height:100, color:'red'});
        this.floor = game.node.box({width:800, height:100, color:'green'});
        this.button = game.node.sprite({name:'button', width:100, height:100});
        this.title = game.node.label({
            color: 'black',
            text: 'Basketball the game',
            font: 'Arial',
            size: 40,
            textAlign: "center",
            textBaseline: "middle"
        });

        this.title.transform.position = new Vector3(400,100,0);
        this.floor.transform.position = new Vector3(0,500,0);
        this.floor.physics.static = true;

        this.box.physics.mass = 1;
        this.box.physics.bounciness = 0.8;
        this.box.physics.friction = 0;
        this.box.physics.applyForce(new Vector3(5,0,0));

        this.button.transform.position = new Vector3(100,100,0);

        PhysicManager.addObject(this.box);
        PhysicManager.addObject(this.button);
        PhysicManager.addObject(this.floor);
    }

    update(deltatime: number): void {
        this.box?.render();
        this.floor?.render();
        this.title?.render();
        this.button?.render();
    }
}

const game = Aura.start({
    width: 800,
    height: 600,
    backgroundColor: 'pink',
    scenes: [
        { name: 'Game', scene: new Main() },
    ],
    initialScene: 'Game',
    resources: [
        { name: 'button', path: './button.png'},
    ]
})
