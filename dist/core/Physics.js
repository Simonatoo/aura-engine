class PhysicEngine {
    constructor() {
        this.gravity = { x: 0, y: 9.18 };
        this.object_list = [];
    }
    addObject(object) {
        this.object_list.push(object);
    }
    addObjects(objects) {
        objects.forEach(obj => {
            this.object_list.push(obj);
        });
    }
    update(deltatime) {
        this.object_list.forEach((obj) => {
            obj.applyForce(this.gravity);
            obj.update(deltatime);
        });
    }
}
class PhysicObject {
    constructor(position, mass) {
        this.position = position;
        this.velocity = { x: 0, y: 0 };
        this.aceleration = { x: 0, y: 0 };
        this.mass = mass || 1;
        this.gravity = true;
    }
    applyForce(force) {
        if (!this.gravity)
            return;
        this.aceleration.x += force.x / this.mass;
        this.aceleration.y += force.y / this.mass;
    }
    update(deltatime) {
        if (!this.gravity)
            return;
        this.velocity.x += this.aceleration.x * deltatime;
        this.velocity.y += this.aceleration.y * deltatime;
        this.position.x += this.velocity.x * deltatime;
        this.position.y += this.velocity.y * deltatime;
        this.aceleration.x = 0;
        this.aceleration.y = 0;
    }
}
const Physics = new PhysicEngine();
export { Physics, PhysicObject };
