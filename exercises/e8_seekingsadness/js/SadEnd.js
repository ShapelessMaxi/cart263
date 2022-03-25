class SadEnd extends Phaser.Scene {
  constructor() {
    super({
      key: `sad-end`,
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
    let title = this.add.text(270, 50, 'u still sad', {
      fontFamily: 'Arial',
      fontSize: 64,
      color: '#00ff00'
    });
  }

  update() {

  }
}
