import { Player } from "./player";
import { Sand } from "./sand";
import { Victim } from "./victim";

export class MainState extends Phaser.State {
    player: Player;
    sands: Phaser.Group;
    victims: Phaser.Group;
    text: Phaser.Text;

    score = 0;
    sand = 0;
    odor = 0;
    unsand = 0;

    constructor() {
        super();
    }

    init() {
    }

    preload() {
        this.load.image("player-atack", "assets/player-atack.png");
        this.load.image("sand", "assets/sand.png");
        this.load.image("player", "assets/player.png");
        this.load.image("victim", "assets/victim.png");
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player = new Player(this.game);
        this.game.physics.arcade.enable(this.player);
        this.add.existing(this.player);

        this.text = this.game.add.text(10, 10, "", { fill: "#fff" });

        this.sands = this.add.physicsGroup();
        this.victims = this.add.physicsGroup();
    }

    update() {
        if (this.rnd.between(0, 60 * 5) === 0) {
            this.sands.add(new Sand(this.game));
        }

        if (this.rnd.between(0, 60 * 15) === 0) {
            this.victims.add(new Victim(this.game));
        }


        if (this.player.atack) {
            this.game.physics.arcade.collide(this.player, this.victims, (_p: Player, v: Victim) => {
                v.destroy(true);
                this.unsand++;
            });
        }

        this.game.physics.arcade.collide(this.player, this.sands, (_p: Player, s: Sand) => {
            s.destroy(true);
            this.sand++;
        });

        if (this.sand !== 0 && this.unsand !== 0) {
            this.sand--;
            this.unsand--;
            this.score++;
        }
        this.odor += this.unsand;

        this.text.text = `Score:${this.score}\nSand:${this.sand}\nUnsand:${this.unsand}\nOdor:${this.odor}`;
    }
}