/*
General behaviors of other -Dalton subclasses.

> draw the character
> move the character using 'wasd'
>
>
*/
class Dalton {
  /*
  define variables and arrays
  */
  constructor(name) {
    // x value (center) of the character
    this.x = 80; // start on the left of the screen
    // y value (bottom) of the character
    this.y = height - 280;
    // width of the character
    this.w = 62;

    // change image mode to corner... change movement also
    // this.pos = {
    //   x1: 80,
    //   y1: height - 280,
    //   x2: 80,
    //   y2: 100,
    // };

    // refer to the eyes object
    this.eyes = {
      size: 14,
      x1: undefined,
      x2: undefined,
      space: 18,
      y: undefined,
    };

    // refer to the character's move speed
    this.moveSpeed = 8;

    // takes care of flipping the image when moving
    this.lookRight = true;

    // used to control the idle animation
    this.idleAnim = {
      tall: true,
      speed: 4, // the higher this value is, the lower the speed of the animation
      change1: 1,
      change2: 10,
    };

    /*
    choose depending on the name of the character:
    - the image
    - the image height
    - the height of the eyes
    - if the character is the leader or not
    */
    if (name === `joe`) {
      this.img = joeImg;
      this.h = 150;
      this.eyeHeight = 45;
      this.leader = true;
    } else if (name === `jack`) {
      this.img = jackImg;
      this.h = 160;
      this.eyeHeight = 52;
      this.leader = false;
    } else if (name === `william`) {
      this.img = williamImg;
      this.h = 170;
      this.eyeHeight = 52;
      this.leader = false;
    } else if (name === `averell`) {
      this.img = averellImg;
      this.h = 190;
      this.eyeHeight = 52;
      this.leader = false;
    }
  }

  /*
  draw the character
  */
  update(color1, color2, generalAlpha) {
    // draw the character
    this.drawCharacter(color1, color2, generalAlpha);

    // takes care of the character movement
    this.moveCharacter();
  }

  // draw the character
  drawCharacter(color1, color2, generalAlpha) {
    // draw the main body
    this.drawBody(color1, generalAlpha);
    // draw the head
    this.drawEyes(color2, generalAlpha);
  }

  // draw the image of the character
  drawBody(color1, generalAlpha) {
    push();
    imageMode(CENTER);
    tint(color1.r, color1.g, color1.b, generalAlpha);
    if (this.lookRight) {
      image(this.img, this.x, this.y, this.w, this.h);
    } else if (!this.lookRight) {
      scale(-1, 1);
      image(this.img, -this.x, this.y, this.w, this.h);
    }
    pop();
  }

  // draw the eyes of the character
  drawEyes(color2, generalAlpha) {
    // define the position of the eyes depending on the position of the body
    this.eyes.y = this.y - this.eyeHeight;
    this.eyes.x1 = this.x;
    if (this.lookRight) {
      this.eyes.x2 = this.x + this.eyes.space;
    } else if (!this.lookRight) {
      this.eyes.x2 = this.x - this.eyes.space;
    }

    // draw the eyes
    push();
    noStroke();
    fill(color2.r, color2.g, color2.b, generalAlpha);
    ellipse(this.eyes.x1, this.eyes.y, this.eyes.size);
    ellipse(this.eyes.x2, this.eyes.y, this.eyes.size);
    pop();
  }

  // takes care of the movement of the character
  moveCharacter() {
    // user controlled movement with wasd
    this.userMovement();

    // constrain the character to an area of the screen
    this.screenConstrain();
    // idle animation applied to the character all the time
    this.idleAnimation();
  }

  // user controlled movement with wasd
  userMovement() {
    if (this.leader) {
      // movement for the leader only
      if (keyIsDown(`68`)) {
        // keycode 68 -> `d` key
        this.x += this.moveSpeed;
        this.lookRight = true;
      } else if (keyIsDown(`65`)) {
        // keycode 68 -> `a` key
        this.x -= this.moveSpeed;
        this.lookRight = false;
      } else if (keyIsDown(`87`)) {
        // keycode 87 -> `w` key
        this.y -= this.moveSpeed;
      } else if (keyIsDown(`83`)) {
        // keycode 87 -> `s` key
        this.y += this.moveSpeed;
      }
    }
  }

  // non-leader character movement
  nonLeaderMovement() {}

  // idle animation
  idleAnimation() {
    if (frameCount % this.idleAnim.speed === 0) {
      if (this.idleAnim.tall) {
        this.h -= this.idleAnim.change1;
        this.h -= this.idleAnim.change2;
        this.idleAnim.tall = false;
      } else {
        this.h += this.idleAnim.change1;
        this.h += this.idleAnim.change2;
        this.idleAnim.tall = true;
      }
    }
  }

  // constrain the character to an area of the screen
  screenConstrain() {
    // constrain the character to the screen
    this.x = constrain(this.x, -50, width + 50);
    // constrain the character to the floor
    this.y = constrain(this.y, height - 300, height - 100);
  }
}
