export interface Scene {
    /**
     * Preload load scene.
     */
    start(): void 
    update(deltatime:number): void 
}