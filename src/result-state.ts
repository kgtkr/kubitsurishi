export class ResultState extends Phaser.State {
  score: number;
  constructor() {
    super();
  }

  init(score: number) {
    this.score = score;
  }

  preload() {
  }

  create() {
    this.game.add.text(10, 10, `GameOver\nScore:${this.score}`, { fill: "#fff" });
  }

  update() {
    if (this.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
      this.game.state.start("mainState", true);
    }
  }
}