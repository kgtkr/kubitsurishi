import { Player } from "./player";
import { Sand } from "./sand";

export class MainState extends Phaser.State {
    player: Player;
    sands: Phaser.Group;

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

        this.sands = this.add.group();
    }

    update() {
        if (this.rnd.between(0, 60 * 5) === 0) {
            this.sands.add(new Sand(this.game));
        }
    }
}