import * as util from "./util";

export class Sand extends Phaser.Sprite {
  speed = 1;
  gUpdateIt = this.gUpdate();

  constructor(game: Phaser.Game) {
    super(game, game.world.randomX, game.world.randomY, "sand");
  }

  update() {
    super.update();
    this.gUpdateIt.next();
    util.setIn(this.game, this);
  }

  * gUpdate(): IterableIterator<void> {
    for (let i = 0; i < 5; i++) {
      const rad = this.game.rnd.realInRange(0, 2 * Math.PI);
      const vx = Math.cos(rad) * this.speed;
      const vy = Math.sin(rad) * this.speed;
      for (let j = 0; j < 60; j++) {
        this.x += vx;
        this.y += vy;
        yield;
      }
    }
    this.destroy(true);
  }
}