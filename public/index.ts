import { Aura, Scene } from "../src/core/Engine";
import { PhysicManager } from "../src/core/Physics";
import { Vector3 } from "../src/math/Vector3";
import { Box } from "../src/nodes/box";
import { Label } from "../src/nodes/label";
import { Sprite } from "../src/nodes/sprite";

let mouse_x:number;
let mouse_y:number;
let force_pitch:number = 0;
let force_direction = 1;
let isReady:boolean = false;

class Main implements Scene {
    force: Box|undefined;
    title: Label|undefined;
    ball: Sprite|undefined;
    floor: Box|undefined;
    basket: Sprite|undefined;
    point: Box|undefined;
    left_b: Box|undefined;
    right_b: Box|undefined;
    bg: Box|undefined;


    start(): void {
        document.addEventListener('mousemove', e => this.getMousePosition(e));
        document.addEventListener('click', e => this.ballPitch());

        PhysicManager.gravity.y = 9.81;

        this.bg = game.node.box({width:800, height:600, color: 'rgba(0,0,0,0.9)'})
        this.force = game.node.box({width:10,height:10, color:'red'})
        this.left_b = game.node.box({width:5, height:70, color:'green'});
        this.right_b = game.node.box({width:5, height:200, color:'green'});
        this.floor = game.node.box({width:800, height:100, color:'green'});
        this.point = game.node.box({color: 'red', width: 100, height:25})
        this.ball = game.node.sprite({name:'ball', width:50, height:50});
        this.basket = game.node.sprite({name:'basket'});
        this.title = game.node.label({color: 'white',text: 'Click to start',font: 'Arial',size: 28,textAlign: "center",textBaseline: "middle"});

        this.title.transform.position = new Vector3(400,300,0);
        this.floor.transform.position = new Vector3(0,550,0);
        this.ball.transform.position = new Vector3(100,400,0);
        this.basket.transform.position = new Vector3(650,100,0);
        this.point.transform.position = new Vector3(620, 250, 0);
        this.left_b.transform.position = new Vector3(
            this.point.transform.position.x,
            this.point.transform.position.y - this.left_b.transform.height,
            0
        )
        this.right_b.transform.position = new Vector3(
            this.point.transform.position.x + (this.point.transform.width - this.right_b.transform.width),
            this.point.transform.position.y - this.right_b.transform.height,
            0
        )
        this.force.transform.position = new Vector3(20,0,0);

        this.floor.physics.isStatic = true;
        this.point.physics.isStatic = true;
        this.left_b.physics.isStatic = true;
        this.right_b.physics.isStatic = true;
        this.ball.physics.isStatic = true;

        this.point.physics.isTrigger = true;

        this.ball.physics.bounciness = 0.8;
        this.basket.physics.bounciness = 0.1;

        this.ball.physics.applyForce(new Vector3(14.5,-100,0));

        PhysicManager.addObject(this.ball);
        PhysicManager.addObject(this.left_b);
        PhysicManager.addObject(this.right_b);
        PhysicManager.addObject(this.floor);
        PhysicManager.addObject(this.point);
    }

    update(deltatime: number): void {
        this.force?.render();
        this.floor?.render();
        this.ball?.render();
        this.basket?.render();
        this.point?.render();
        this.left_b?.render();
        this.right_b?.render();
        this.bg?.render();
        this.title?.render();

        if (!this.ball) return;
        if (!this.point) return;
        
        if(game.checkColliding(this.ball, this.point)) {
            if(this.ball.transform.position.y < this.point.transform.position.y)
                return;
            console.log('test')
        }

        this.ballForce(deltatime);
    }

    ballForce(deltatime:number): void {
        let force_offset = new Vector3(10,450,0);
        let force_color = `rgb(${force_pitch},50,0)`

        if (!this.force) return;

        if (force_pitch > 500)
            force_direction = -1;
        if (force_pitch < 1)
            force_direction = 1;
         
        force_pitch += 5 * force_direction;
        this.force.transform.position.y = -(force_pitch * 0.8) + force_offset.y;
        this.force.config.color = force_color;
    }

    ballPitch(): void {
        if(!this.ball) return;
        if(!this.bg) return;
        if(!this.title) return;
        if (!isReady) {
            isReady = true;
            this.bg.config.color = 'transparent';
            this.title.transform.position.x = 9999;
            return;
        }

        

        this.ball.physics.isStatic = false;
        this.ball.physics.applyForce(new Vector3((mouse_x/100)*force_pitch,(mouse_y/100)*force_pitch,0));
        console.log(-(mouse_x/100)*force_pitch,-(mouse_y/100)*force_pitch);
        console.log(force_pitch)
    }

    getMousePosition(e:MouseEvent): void {
        if (!this.ball) return;
        mouse_x = e.clientX - this.ball.transform.position.x - (this.ball.transform.width/2);
        mouse_y = e.clientY - this.ball.transform.position.y - (this.ball.transform.height/2);
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
        { name: 'ball', path: './ball.png'},
        { name: 'basket', path: './basket.png'},
    ]
})
