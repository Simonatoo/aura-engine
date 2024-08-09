class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    lerp() {
        return new Vector2(this.x, this.y);
    }
    forward() { }
    distance(obj1, obj2) { }
}
export { Vector2 };
