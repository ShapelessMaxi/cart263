/*
Title scene
click to change the title (more infos)
click to change to the next scene
*/
class Title extends Phaser.Scene {
  constructor() {
    super({
      key: `title`,
    });

    this.avatar = {
      x: 400,
      y: 300,
    }

    this.circle = {
      size: 50,
      color: 0x24100c,
    }
  }

  /*
  create the images
  create the text
  create the circle
  */
  create() {

    // create the circle
    let circle = this.add.circle(this.avatar.x, this.avatar.y, this.circle.size, this.circle.color);

    // create the avatar image
    this.avatar = this.add.sprite(this.avatar.x, this.avatar.y, `avatar`);

    // create the thumbs down image
    this.sadness = this.add.sprite(250, 300, `thumbs-down`);

    // create the happiness group (thumbs-up) image
    this.happiness = this.add.sprite(550, 300, `thumbs-up`);

    // create the arrow keys image
    this.arrow = this.add.sprite(260, 500, `arrow-keys`);

    // create the navigation text
    this.navigText = this.add.text(345, 490, 'user arrow keys to navigate', {
      font: "18px Arial",
      fill: "#ffffff"
    });

    // create the title
    let title = this.add.text(150, 50, 'CLICK TO START', {
      fontFamily: 'Arial',
      fontSize: 64,
      color: '#00ff00'
    });


    // when the user clicks, change the title
    let numClicks = 0;
    this.input.on('pointerdown', () => {
      if (numClicks === 0) {
        title.text = 'U R SAD';
        title.x = 270;
        numClicks++;
      } else if (numClicks === 1) {
        title.text = 'U DONT WANNA B HAPPY';
        title.x = 1;
        numClicks++;
      } else if (numClicks === 2) {
        title.text = 'chase the thumbs down';
        title.x = 60;
        numClicks++;
      } else if (numClicks === 3) {
        title.text = 'click to start (4real)';
        title.x = 140;
        numClicks++;
      } else if (numClicks === 4) {
        this.scene.start(`play`);
      };
    });
  }

  update() {

  }
}
