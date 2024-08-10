import global from "../global/global";
import { Vector2 } from "../math/vector";
import { PhysicObject, Physics } from "./Physics";


class GameObject extends PhysicObject {
    position: Vector2;
    width: number
    height: number
    private components: Component[];

    constructor() {
        let initial_position = new Vector2(0,0);
        super(initial_position);
        this.position = initial_position;
        this.width! = 0;
        this.height! = 0;
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
    abstract render():void;
}

export {
    Component,
    GameObject
}
