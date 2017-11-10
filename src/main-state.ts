export class MainState extends Phaser.State {
    constructor() {
        super();
    }

    init() {
    }

    preload() {
        this.load.image('test', 'assets/test.png');
    }

    create() {
        var logo = this.add.sprite(this.world.centerX, this.world.centerY, 'test');
        logo.anchor.setTo(0.5, 0.5);
    }

    update() {
    }
}