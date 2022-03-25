class HappyEnd extends Phaser.Scene {
  constructor() {
    super({
      key: `happy-end`,
    });

    this.avatar = {
      x: 400,
      y: 300,
    }
  }

  /*
  create the images
  create the text
  */
  create() {
    // create the avatar image
    this.avatar = this.add.sprite(this.avatar.x, this.avatar.y, `avatar`);

    // create the title
    let title = this.add.text(180, 50, 'u got too happy', {
      fontFamily: 'Arial',
      fontSize: 64,
      color: '#00ff00'
    });
  }

  update() {

  }
}
