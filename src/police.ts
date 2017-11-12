import * as util from "./util";

export class Police extends Phaser.Sprite {
  speed = 3;
  gUpdateIt = this.gUpdate();
  shot: Phaser.Signal;

  constructor(game: Phaser.Game) {
    super(game, game.world.randomX, game.world.randomY, "police");
    this.shot = new Phaser.Signal();
  }

  update() {
    super.update();
    this.gUpdateIt.next();
    util.setIn(this.game, this);
  }

  * gUpdate(): IterableIterator<void> {
    while (true) {
      for (let i = 0; i < 5; i++) {
        const rad = this.game.rnd.realInRange(0, 2 * Math.PI);
        const vx = Math.cos(rad) * this.speed;
        const vy = Math.sin(rad) * this.speed;
        for (let j = 0; j < 30; j++) {
          this.x += vx;
          this.y += vy;
          yield;
        }
      }
      this.shot.dispatch();

    }
  }

  shutdown() {
    this.shot.removeAll();
  }
}