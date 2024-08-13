class Vector3 {
    x: number
    y: number
    z: number
    constructor(x:number, y:number, z:number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static zero(): Vector3 {
        return new Vector3(0,0,0);
    }
    static one(): Vector3 {
        return new Vector3(1,1,1);
    }
    reset() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}

export { Vector3 };