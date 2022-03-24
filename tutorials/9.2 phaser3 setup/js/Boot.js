class Boot extends Phaser.Scene {

  constructor() {
    super({
      key: `boot`,
    });
  }

  preload() {
    // load the clown image
    this.load.image(`clown`, `assets/images/clown.png`);

    // load the avatar spritecheat
    this.load.spritesheet(`avatar`, `assets/images/avatar.png`, {
      frameWidth: 32,
      frameHeight: 32,
      endFrame: 6,
    });

    // change to the play scene after files are loaded
    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
  }

  create() {
    // define the style of the text
    let style = {
      fontFamily: `sans-serif`,
      fontSize: `40px`,
      color: `#00ffff`,
    };
    // define the text to display
    let loadingString = `Loading...`;
    //  create text with previous style settings
    this.add.text(100, 100, loadingString, style);
  }

  update() {

  }

}
