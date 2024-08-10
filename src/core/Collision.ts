import { GameObject } from "./GameObject";
import { PhysicObject } from "./Physics";

class Collider2DCore {
    isObjectsNotColliding(obj1: GameObject, obj2: GameObject): boolean {
        const notCollidingX = obj1.position.x + obj1.width < obj2.position.x ||
                              obj2.position.x + obj2.width < obj1.position.x;
                              
        const notCollidingY = obj1.position.y + obj1.height < obj2.position.y ||
                              obj2.position.y + obj2.height < obj1.position.y;

        return notCollidingX || notCollidingY;
    }

    isObjectsColliding(obj1: GameObject, obj2: GameObject): boolean {
        return !this.isObjectsNotColliding(obj1, obj2);
    }
}

const Collider2D = new Collider2DCore();

export { 
    Collider2D 
};
