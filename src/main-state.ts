import { Player } from "./player";
import { Sand } from "./sand";
import { Victim } from "./victim";
import { Police } from "./police";
import { Bullet } from "./bullet";

export class MainState extends Phaser.State {
    player: Player;
    sands: Phaser.Group;
    victims: Phaser.Group;
    polices: Phaser.Group;
    bullets: Phaser.Group;
    text: Phaser.Text;

    life: number;
    score: number;
    sand: number;
    odor: number;
    unsand: number;

    constructor() {
        super();
    }

    init() {
        this.life = 3;
        this.score = 0;
        this.sand = 0;
        this.odor = 0;
        this.unsand = 0;
    }

    preload() {
        this.load.image("player-atack", "assets/player-atack.png");
        this.load.image("sand", "assets/sand.png");
        this.load.image("player", "assets/player.png");
        this.load.image("victim", "assets/victim.png");
        this.load.image("police", "assets/police.png");
        this.load.image("bullet", "assets/bullet.png");
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player = new Player(this.game);
        this.game.physics.arcade.enable(this.player);
        this.add.existing(this.player);

        this.text = this.game.add.text(10, 10, "", { fill: "#fff" });

        this.sands = this.add.physicsGroup();
        this.victims = this.add.physicsGroup();
        this.polices = this.add.physicsGroup();
        this.bullets = this.add.physicsGroup();
    }

    addPolice() {
        let p = new Police(this.game);
        this.polices.add(p);
        p.shot.add(() => {
            const vx = this.player.x - p.x;
            const vy = this.player.y - p.y;
            this.bullets.add(new Bullet(this.game, p.x, p.y, Math.atan2(vy, vx)));
        });
    }

    update() {
        if (this.rnd.between(0, 60 * 5) === 0) {
            this.sands.add(new Sand(this.game));
        }

        if (this.rnd.between(0, 60 * 10) === 0) {
            let v = new Victim(this.game);
            this.victims.add(v);
            v.run.add(() => {
                for (let i = 0; i < 3; i++) {
                    this.addPolice();
                }
            })
        }

        if (this.odor >= 200) {
            this.odor = 0;
            this.addPolice();
        }

        if (this.player.atack) {
            this.game.physics.arcade.collide(this.player, this.victims, (_p: Player, v: Victim) => {
                v.destroy(true);
                this.unsand++;
                this.odor += 100;
            });

            this.game.physics.arcade.collide(this.player, this.polices, (_p: Player, p: Police) => {
                p.destroy(true);
            });
        }

        this.game.physics.arcade.collide(this.player, this.bullets, (_p: Player, b: Bullet) => {
            b.destroy(true);
            this.life--;
            if (this.life === 0) {
                this.game.state.start("resultState", true, false, this.score);
            }
        });

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

        this.text.text = `Score:${this.score}\nLife:${this.life}\nSand:${this.sand}\nUnsand:${this.unsand}\nOdor:${this.odor}`;
    }
}