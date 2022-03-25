class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`,
    });
  }

  /*
  load the sprite
  change the scene
  */
  preload() {
    // load the avatar sprite
    this.load.image(`avatar`, `assets/images/avatar.png`);

    // load the thumbs down image
    this.load.image(`thumbs-down`, `assets/images/thumbsdown.png`);
    
    // load the thumbs up image
    this.load.image(`thumbs-up`, `assets/images/thumbsup.png`);

    // change the scene after everything is loaded
    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
  }

  create() {}

  update() {}

}
