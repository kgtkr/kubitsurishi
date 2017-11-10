import { Player } from "./player";

export class MainState extends Phaser.State {
    player: Player;

    constructor() {
        super();
    }

    init() {
    }

    preload() {
    }

    create() {
        this.player = new Player(this.game);
        this.add.existing(this.player);
    }

    update() {
        this.player.update();
    }

    * gUpdate(): IterableIterator<void> {
        while (true) {

        }
    }
}