class Vector2 {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    lerp(): Vector2 { 
        return new Vector2(this.x,this.y);
    }

    forward() { }

    distance(obj1: any, obj2: any) { }
}

export {
    Vector2
}