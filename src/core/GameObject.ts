import global from "../global/global.js";
import { Vector2 } from "../math/vector.js";
import { PhysicObject, Physics } from "./Physics.js";

class GameObject extends PhysicObject {
    position: Vector2;
    private components: Component[];

    constructor() {
        let initial_position = new Vector2(0,0);
        super(initial_position);
        this.position = initial_position;
        this.components = [];
        global.addObject(this);
    }

    render() {
        this.components.forEach(comp => comp.render());
    }

    public getComponent<T extends Component>(componentClass: new () => T | undefined) {
        return this.components.find(c => c instanceof componentClass);
    }

    addComponent(component:Component) {
        component.gameobject = this;
        this.components.push(component);
    }
}

abstract class Component {
    public gameobject!: GameObject;
    // abstract update(deltatime:number):void;
    abstract render():void;
}

class Box extends Component {
    width: number;
    height: number;

    constructor(width:number, height:number) {
        super();
        this.width = width;
        this.height = height;
    }
    render(): void {
        const canvas:HTMLCanvasElement | null = document.body.querySelector('canvas');
        if (!canvas) return;
        const context:CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!context) return;
        context.fillRect(this.gameobject.position.x, this.gameobject.position.y,this.width,this.height);
    }
}

export {
    Component,
    GameObject
}
