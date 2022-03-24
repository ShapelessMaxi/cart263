/*
scene class
*/

class Play extends Phaser.Scene {

  constructor() {
    super({
      key: `play`,
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
    let gameDescription = `Think of a number... wrong`;
    //  create text with previous style settings
    this.add.text(100, 100, gameDescription, style);

    // create the clown walls as a group
    this.walls = this.physics.add.group({
      key: `clown`,
      immovable: true,
      quantity: 3,
    });
    this.walls.children.each(function (wall) {
      let x = Math.random() * this.sys.canvas.width;
      let y = Math.random() * this.sys.canvas.height;
      wall.setPosition(x, y);
      wall.setTint(0xdd3333)
    }, this);

    // create the collectable clowns as a group
    this.collectables = this.physics.add.group({
      key: `clown`,0
      immovable: true,
      quantity: 10,
    });
    this.collectables.children.each(function (collectables) {
      let x = Math.random() * this.sys.canvas.width;
      let y = Math.random() * this.sys.canvas.height;
      collectables.setPosition(x, y);
    }, this);

    // create the avatar image
    this.avatar = this.physics.add.sprite(200, 500, `avatar`);
    this.createAnimation();

    // define the physics variables
    this.avatar.setCollideWorldBounds(true);

    // play the idle animation
    this.avatar.play(`avatar-idle`);

    // define the collision between the avatar and the clowns
    this.physics.add.collider(this.avatar, this.walls);
    // define the overlap between the avatar and the clown collectable
    this.physics.add.overlap(this.avatar, this.collectables, this.collectItem, null, this);

    // create the cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  // collect items
  collectItem (avatar, collectable) {
    // destroy the item
    collectable.destroy();
  }

  // create sprite animations
  createAnimation() {
    // create the moving avatar animation
    this.anims.create({
      key: `avatar-moving`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 0,
        end: 6,
      }),
      frameRate: 6,
      repeat: -1,
    });
    // create the not moving avatar animation
    this.anims.create({
      key: `avatar-idle`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 0,
        end: 0,
      }),
      frameRate: 6,
      repeat: -1,
    });
  }

  // update the game scene
  update() {
    // apply user movement
    this.userMovement();
  }

  // apply user movement
  userMovement() {
    this.avatar.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.avatar.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.avatar.setVelocityX(300);
    }

    if (this.cursors.up.isDown) {
      this.avatar.setVelocityY(-300);
    } else if (this.cursors.down.isDown) {
      this.avatar.setVelocityY(300);
    }

    if (this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !== 0) {
      // play the moving animation
      this.avatar.play(`avatar-moving`, true);
    } else {
      // play the idle animation
      this.avatar.play(`avatar-idle`, true);
    }
  }

}
