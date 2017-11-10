/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts"/>
import { MainState } from "./main-state";

const game = new Phaser.Game(800, 600, Phaser.AUTO, '');
game.state.add("mainState", MainState);
window.onload = () => {
    game.state.start("mainState");
}