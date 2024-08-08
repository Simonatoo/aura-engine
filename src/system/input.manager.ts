import { Keycode } from "./input.map";

class Input {
    keydown: string | null;
    private keydownHandler: (event: KeyboardEvent) => void;

    constructor() {
        this.keydown = null;
        this.keydownHandler = (event: KeyboardEvent) => {
            this.keydown = event.key;
        };
        this.setListeners();
    }

    private setListeners() {
        document.addEventListener('keydown', this.keydownHandler);
        document.addEventListener('keyup', () => {
            this.keydown = null;
        });
    }

    public getKeyDown(keycode?: Keycode | string | null) {
        if (this.keydown === keycode) {
            this.keydown = null; // Reset keydown to avoid multiple detections
            return true;
        }
        return false;
    }
}

const input = new Input();

export {
    input as Input,
}

