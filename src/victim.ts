export class Victim extends Phaser.Sprite {
  speed = 2;
  gUpdateIt = this.gUpdate();

  constructor(game: Phaser.Game) {
    super(game, game.world.randomX, game.world.randomY, "victim");
  }

  update() {
    super.update();
    this.gUpdateIt.next();
  }

  * gUpdate(): IterableIterator<void> {
    for (let i = 0; i < 30; i++) {
      const rad = this.game.rnd.realInRange(0, 2 * Math.PI);
      const vx = Math.cos(rad) * this.speed;
      const vy = Math.sin(rad) * this.speed;
      for (let j = 0; j < 30; j++) {
        this.x += vx;
        this.y += vy;
        yield;
      }
    }
    this.destroy(true);
  }
}