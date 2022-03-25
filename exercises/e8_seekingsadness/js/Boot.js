/*
loads everything before changing to the title scene
*/
class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`,
    });
  }

  /*
  load the sprite
  load th other images
  change the scene
  */
  preload() {
    // load the avatar sprite
    this.load.image(`avatar`, `assets/images/avatar.png`);

    // load the thumbs down image
    this.load.image(`thumbs-down`, `assets/images/thumbsdown.png`);

    // load the thumbs up image
    this.load.image(`thumbs-up`, `assets/images/thumbsup.png`);

    // load the arrow keys image
    this.load.image(`arrow-keys`, `assets/images/arrowkeys.png`);

    // change the scene after everything is loaded
    this.load.on(`complete`, () => {
      this.scene.start(`title`);
    });
  }

  create() {}

  update() {}

}
