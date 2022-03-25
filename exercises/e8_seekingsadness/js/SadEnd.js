/*
End screen happens when you get to 5 sad
*/
class SadEnd extends Phaser.Scene {
  constructor() {
    super({
      key: `sad-end`,
    });

    this.avatar = {
      x: 400,
      y: 300,
    }

    // define parameters for the title
    this.title = {
      object: undefined,
      x: 270,
      y: 100,
      string: 'u still sad',
      font: 'Arial',
      size: 64,
      textColor: '#00ff00',
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
    this.title.object = this.add.text(this.title.x, this.title.y, this.title.string, {
      fontFamily: this.title.font,
      fontSize: this.title.size,
      color: this.title.textColor,
    });
  }

  update() {

  }
}
