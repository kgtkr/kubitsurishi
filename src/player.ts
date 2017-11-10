export class Player extends Phaser.Text {
  speed = 3;

  constructor(game: Phaser.Game) {
    super(game, game.world.width / 2, game.world.height - 100, "主", { fill: "#ffffff" });
  }

  update() {
    super.update();
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.x -= this.speed;
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.x += this.speed;
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.y -= this.speed;
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.y += this.speed;
    }
  }
}