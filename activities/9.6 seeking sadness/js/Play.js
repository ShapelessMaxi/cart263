class Play extends Phaser.Scene {
  constructor() {
    super({
      key: `play`,
    });
  }

  create() {
    // create the avatar
    this.avatar = this.physics.add.sprite(400, 300, `avatar`);
    this.avatar.setCollideWorldBounds(true);

    // create the thumbs down
    let x = Math.random() * this.sys.canvas.width;
    let y = Math.random() * this.sys.canvas.height;
    this.sadness = this.physics.add.sprite(x, y, `thumbs-down`);
    this.sadness.setCollideWorldBounds(true);


    // create the happiness group (thumbs-up)
    this.happiness = this.physics.add.group({
      key: `thumbs-up`,
      quantity: 100,
      bounceX: 0.6,
      bounceY: 0.6,
      collideWorldBounds: true,
      dragX: 50,
      dragY: 50,
    });
    Phaser.Actions.RandomRectangle(this.happiness.getChildren(), this.physics.world.bounds);

    this.physics.add.overlap(this.avatar, this.sadness, this.getSad, null, this);
    this.physics.add.collider(this.avatar, this.happiness);
    this.physics.add.collider(this.happiness, this.happiness);
    this.physics.add.collider(this.happiness, this.sadness);

    // create the cursors using the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  // define the behavior when overlap happens between the avatar and the thumbs-down
  getSad(avatar, sadness){
    let x = Math.random() * this.sys.canvas.width;
    let y = Math.random() * this.sys.canvas.height;
    this.sadness.setPosition(x, y);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.avatar.setAngularVelocity(-150);
    } else if (this.cursors.right.isDown) {
      this.avatar.setAngularVelocity(150);
    } else {
      this.avatar.setAngularVelocity(0);
    }

    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.avatar.rotation, 600, this.avatar.body.acceleration);
    } else {
      this.avatar.setAcceleration(0);
    }
  }
}
