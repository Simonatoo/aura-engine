import { Vector3 } from "../math/Vector3"
import { GameObject } from "./GameObject"

class Colliders {
    isNotNodesColliding(obj1: GameObject, obj2: GameObject) {
        return obj1.transform.position.x + obj1.transform.width < obj2.transform.position.x ||
            obj2.transform.position.x + obj2.transform.width < obj1.transform.position.x ||
            obj1.transform.position.y + obj1.transform.height < obj2.transform.position.y ||
            obj2.transform.position.y + obj2.transform.height < obj1.transform.position.y
    }

    isNodesColliding(obj1:GameObject, obj2:GameObject) {
        return !this.isNotNodesColliding(obj1, obj2);
    }

    resolveCollision(obj1: GameObject, obj2: GameObject) {
        const pos1 = obj1.transform.position;
        const pos2 = obj2.transform.position;

        const width1 = obj1.transform.width;
        const height1 = obj1.transform.height;
        const width2 = obj2.transform.width;
        const height2 = obj2.transform.height;

        const overlapX = Math.min(pos1.x + width1 - pos2.x, pos2.x + width2 - pos1.x);
        const overlapY = Math.min(pos1.y + height1 - pos2.y, pos2.y + height2 - pos1.y);

        if (overlapX < overlapY) {
            // Resolve collision on X axis
            if (pos1.x < pos2.x) {
                pos1.x -= overlapX;
            } else {
                pos1.x += overlapX;
            }
        } else {
            // Resolve collision on Y axis
            if (pos1.y < pos2.y) {
                pos1.y -= overlapY;
            } else {
                pos1.y += overlapY;
            }
        }
    }
    isAbove(obj1: GameObject, obj2: GameObject) {
        return obj1.transform.position.y < obj2.transform.position.y;
    }
    isColliding(obj1: GameObject, obj2: GameObject): boolean {
        return Collider.isNodesColliding(obj1, obj2);
    }
}

export const Collider = new Colliders();