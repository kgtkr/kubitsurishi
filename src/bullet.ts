import * as util from "./util";

export class Bullet extends Phaser.Sprite {
  speed = 4;
  vx: number;
  vy: number;

  constructor(game: Phaser.Game, x: number, y: number, rad: number) {
    super(game, x, y, "bullet");
    this.vx = Math.cos(rad) * this.speed;
    this.vy = Math.sin(rad) * this.speed;
  }

  update() {
    super.update();
    this.x += this.vx;
    this.y += this.vy;
    if (!util.isIn(this.game, this)) {
      this.destroy(true);
    }
  }
}