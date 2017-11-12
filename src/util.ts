export function isIn(game: Phaser.Game, sprite: Phaser.Sprite) {
  if (game === null) {
    return;
  }

  return sprite.centerX >= 0 && sprite.centerX <= game.width && sprite.centerY >= 0 && sprite.centerY <= game.height;
}

export function setIn(game: Phaser.Game, sprite: Phaser.Sprite) {
  if (game === null) {
    return;
  }

  if (sprite.centerX < 0) {
    sprite.centerX = 0;
  }

  if (sprite.centerX > game.width) {
    sprite.centerX = game.width;
  }

  if (sprite.centerY < 0) {
    sprite.centerY = 0;
  }

  if (sprite.centerY > game.height) {
    sprite.centerY = game.height;
  }
}