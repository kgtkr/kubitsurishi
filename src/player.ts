export class Player extends Phaser.Sprite {
  speed = 3;
  gUpdateIt = this.gUpdate();
  atack = false;

  constructor(game: Phaser.Game) {
    super(game, game.world.width / 2, game.world.height - 100, "player");
    game.debug.body(this);
  }

  update() {
    super.update();
    this.gUpdateIt.next();
  }

  * gUpdate(): IterableIterator<void> {
    while (true) {
      if (this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
        this.loadTexture('player-atack');
        this.atack = true;
        for (let i = 0; i < 60; i++) {
          yield;
        }
        this.atack = false;
        this.loadTexture('player');
      }
      this.move();
      yield;
    }
  }

  move() {
    const left = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    const right = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    const up = this.game.input.keyboard.isDown(Phaser.Keyboard.UP);
    const down = this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN);

    const x: "l" | "r" | "c" = left && !right ? "l"
      : !left && right ? "r"
        : "c";

    const y: "u" | "d" | "c" = up && !down ? "u"
      : !up && down ? "d"
        : "c";

    let d: "c" | "l" | "r" | "u" | "d" | "ul" | "ur" | "dl" | "dr" = "c";

    switch (x) {
      case "l":
        switch (y) {
          case "u":
            d = "ul";
            break;
          case "d":
            d = "dl";
            break;
          case "c":
            d = "l";
            break;
        }
        break;
      case "r":
        switch (y) {
          case "u":
            d = "ur";
            break;
          case "d":
            d = "dr";
            break;
          case "c":
            d = "r";
            break;
        }
        break;
      case "c":
        switch (y) {
          case "u":
            d = "u";
            break;
          case "d":
            d = "d";
            break;
          case "c":
            d = "c";
            break;
        }
        break;
    }

    const speed = this.speed;
    const speedR = this.speed / Math.SQRT2;

    switch (d) {
      case "l":
        this.x -= speed;
        break;
      case "r":
        this.x += speed;
        break;
      case "u":
        this.y -= speed;
        break;
      case "d":
        this.y += speed;
        break;
      case "ul":
        this.x -= speedR;
        this.y -= speedR;
        break;
      case "ur":
        this.x += speedR;
        this.y -= speedR;
        break;
      case "dl":
        this.x -= speedR;
        this.y += speedR;
        break;
      case "dr":
        this.x += speedR;
        this.y += speedR;
        break;
    }
  }
}