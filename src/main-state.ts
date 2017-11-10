import { Player } from "./player";
import { Sand } from "./sand";
import { Victim } from "./victim";

export class MainState extends Phaser.State {
    player: Player;
    sands: Phaser.Group;
    victims: Phaser.Group;

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
        this.victims = this.add.group();
    }

    update() {
        if (this.rnd.between(0, 60 * 5) === 0) {
            this.sands.add(new Sand(this.game));
        }

        if (this.rnd.between(0, 60 * 15) === 0) {
            this.victims.add(new Victim(this.game));
        }
    }
}