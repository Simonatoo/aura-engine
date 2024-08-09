class Input {
    constructor() {
        this.keydown = null;
        this.keydownHandler = (event) => {
            this.keydown = event.key;
        };
        this.setListeners();
    }
    setListeners() {
        document.addEventListener('keydown', this.keydownHandler);
        document.addEventListener('keyup', () => {
            this.keydown = null;
        });
    }
    getKeyDown(keycode) {
        if (this.keydown === keycode) {
            this.keydown = null; // Reset keydown to avoid multiple detections
            return true;
        }
        return false;
    }
}
const input = new Input();
export { input as Input, };
