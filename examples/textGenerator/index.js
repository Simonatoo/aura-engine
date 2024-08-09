import { Main } from "./scenes/MainScene.js";
import { Pyrus } from "../../dist/core/Engine.js";

export const game = new Pyrus();

const resources = [
    { name: 'button', path: 'button.png' },
    { name: 'cesta', path: './assets/cesta.png'},
];

game.SET_WINDOW_SIZE(800, 600);
game.SET_WINDOW_BG('pink');
game.SET_INITIAL_SCENE('main');

game.LOAD_RESOURCES(resources);
game.LOAD_SCENES([
    { name: 'main', scene: new Main() }
]);

game.RENDER();



