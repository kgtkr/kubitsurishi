/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts"/>
import { MainState } from "./main-state";

const game = new Phaser.Game(800, 600, Phaser.AUTO, '');
game.state.add("mainState", MainState);
window.onload = () => {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.refresh();
    game.state.start("mainState");
};

window.onresize = () => {
    game.scale.refresh();
};