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
    // refer to the eyes object
    this.eyes = {
      size: 14,
      x1: undefined,
      x2: undefined,
      space: 18,
      y: undefined,
      height: 35,
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
      this.leader = true;

      // refer to the position of the character
      this.pos = {
        // position of upper left corner
        x1: 100,
        y1: 430,
        // position of lower right corner
        x2: 168,
        y2: 550,
      };
    } else if (name === `jack`) {
      this.img = jackImg;
      this.leader = false;

      // refer to the position of the character
      this.pos = {
        // position of upper left corner
        x1: 100,
        y1: 405,
        // position of lower right corner
        x2: 168,
        y2: 550,
      };
    } else if (name === `william`) {
      this.img = williamImg;
      this.leader = false;

      // refer to the position of the character
      this.pos = {
        // position of upper left corner
        x1: 100,
        y1: 390,
        // position of lower right corner
        x2: 168,
        y2: 550,
      };
    } else if (name === `averell`) {
      this.img = averellImg;
      this.leader = false;

      // refer to the position of the character
      this.pos = {
        // position of upper left corner
        x1: 100,
        y1: 370,
        // position of lower right corner
        x2: 168,
        y2: 550,
      };
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
    imageMode(CORNERS);
    // tint(color1.r, color1.g, color1.b, generalAlpha);
    if (this.lookRight) {
      image(this.img, this.pos.x1, this.pos.y1, this.pos.x2, this.pos.y2);
    } else if (!this.lookRight) {
      scale(-1, 1);
      image(this.img, -this.pos.x1, this.pos.y1, -this.pos.x2, this.pos.y2);
    }
    pop();
  }

  // draw the eyes of the character
  drawEyes(color2, generalAlpha) {
    // define the position of the eyes depending on the position of the body
    this.eyes.y = this.pos.y1 + this.eyes.height;
    this.eyes.x1 = this.pos.x2 - 2;
    if (this.lookRight) {
      this.eyes.x2 = this.pos.x2 - this.eyes.space;
    } else if (!this.lookRight) {
      this.eyes.x2 = this.pos.x1 + 2;
      this.eyes.x1 = this.pos.x1 + this.eyes.space;
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
        this.pos.x1 += this.moveSpeed;
        this.pos.x2 += this.moveSpeed;
        this.lookRight = true;
      } else if (keyIsDown(`65`)) {
        // keycode 68 -> `a` key
        this.pos.x1 -= this.moveSpeed;
        this.pos.x2 -= this.moveSpeed;
        this.lookRight = false;
      } else if (keyIsDown(`87`)) {
        // keycode 87 -> `w` key
        this.pos.y1 -= this.moveSpeed;
        this.pos.y2 -= this.moveSpeed;
      } else if (keyIsDown(`83`)) {
        // keycode 87 -> `s` key
        this.pos.y1 += this.moveSpeed;
        this.pos.y2 += this.moveSpeed;
      }
    }
  }

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
    this.pos.x1 = constrain(this.pos.x1, -50, 1050);
    // this.pos.x2 = constrain(this.pos.x2, -50, 1050);
    // constrain the character to the floor
    this.pos.y2 = constrain(this.pos.y1, 550, 700);
    // this.pos.y2 = constrain(this.pos.y2, 450, 650);
  }
}
