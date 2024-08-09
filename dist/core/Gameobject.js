import global from "../global/global.js";
import { Vector2 } from "../math/vector.js";
import { PhysicObject } from "./Physics.js";
class GameObject extends PhysicObject {
    constructor() {
        let initial_position = new Vector2(0, 0);
        super(initial_position);
        this.position = initial_position;
        this.width = 0;
        this.height = 0;
        this.components = [];
        global.addObject(this);
    }
    render() {
        this.components.forEach(comp => comp.render());
    }
    getComponent(componentClass) {
        return this.components.find(c => c instanceof componentClass);
    }
    addComponent(component) {
        component.gameobject = this;
        this.components.push(component);
    }
}
class Component {
}
export { Component, GameObject };
