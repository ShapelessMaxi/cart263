/*
main play scene (game)
get 5 sad to win (sad endscreen)
get 500 happy to lose (happy endscreen)
*/
class Play extends Phaser.Scene {
  constructor() {
    super({
      key: `play`,
    });

    // define parameters for the avatar
    this.avatar = {
      x: 400,
      y: 300,
    };

    // define parameters for the sad counter
    this.sadText = {
      object: undefined,
      x: 50,
      y: 50,
      string: `u are 0 sad`,
      font: 'Arial',
      size: 32,
      color: '#00ff00',
    }
    this.sadCount = 0;

    // define parameters for the happy counter
    this.happyText = {
      object: undefined,
      x: 50,
      y: 100,
      string: `u are 0 happy`,
      font: 'Arial',
      size: 32,
      color: '#ff1100',
    }
    this.happyCount = 0;
  }

  create() {
    // create the avatar
    this.avatar = this.physics.add.sprite(this.avatar.x, this.avatar.y, `avatar`);
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
    this.physics.add.collider(this.avatar, this.happiness, this.getHappy, null, this);
    // this.physics.add.overlap(this.avatar, this.hapiness, this.getHappy, null, this);
    this.physics.add.collider(this.happiness, this.happiness);
    this.physics.add.collider(this.happiness, this.sadness);

    // create the cursors using the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // create the sadness counter
    this.sadText.object = this.add.text(this.sadText.x, this.sadText.y, this.sadText.string, {
      fontFamily: this.sadText.font,
      fontSize: this.sadText.size,
      color: this.sadText.color
    });
    // create the happiness counter
    this.happyText.object = this.add.text(this.happyText.x, this.happyText.y, this.happyText.string, {
      fontFamily: this.happyText.font,
      fontSize: this.happyText.size,
      color: this.happyText.color
    });
  }

  // define the behavior when overlap happens between the avatar and the thumbs-down
  getSad(avatar, sadness) {
    let x = Math.random() * this.sys.canvas.width;
    let y = Math.random() * this.sys.canvas.height;
    this.sadness.setPosition(x, y);
    this.sadCount++;
  }

  // define the behavior when overlap happens between the avatar and the thumbs-up
  getHappy(avatar, happiness) {
    this.happyCount++;

  }

  update() {
    this.sadText.object.setText(`u are ${this.sadCount} sad`);
    if (this.sadCount > 5) {
      this.scene.start(`sad-end`);
    }

    this.happyText.object.setText(`u are ${this.happyCount} happy`);
    if (this.happyCount > 500) {
      this.scene.start(`happy-end`);
    }

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
