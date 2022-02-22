/*
Interactions linked to the Leader character
Extension of the Dalton class.

>
>
>
>
*/
class Leader extends Dalton {
  /*
  define variables and arrays
  */
  constructor(color1, color2) {
    // call super class constructor
    super();

    // refer to the position and size parameters
    this.pos = {
      // center of the character (draw image with CENTER mode)
      center: {
        x: 80,
        y: 475,
      },
      // bottom of the character
      y: undefined,
      // height and width
      width: 65,
      height: 125,
    };

    // refer to the image of the character
    this.img = joeImg;

    // refer to the eyes object
    this.eyes = {
      size: 14,
      x1: undefined,
      x2: undefined,
      y: undefined,
      space: 18,
      height: 25,
    };

    // refer to the colors of the character
    this.color1 = color1;
    this.color2 = color2;

    // refer to the character's move speed
    this.moveSpeed = 8;
  }

  /*
  draw the character
  */
  update(generalAlpha) {
    // draw the character
    this.drawCharacter(generalAlpha);

    // takes care of the character movement
    this.moveCharacter();
  }

  // draw the character
  drawCharacter(generalAlpha) {
    // set the actual position of the character
    this.pos.y = this.pos.center.y - this.pos.height / 2;

    // draw the main body
    this.drawBody(generalAlpha);
    // draw the head
    this.drawEyes(generalAlpha);
  }

  // draw the image of the character
  drawBody(generalAlpha) {
    push();
    imageMode(CENTER);
    tint(this.color2.r, this.color2.g, this.color2.b, generalAlpha);
    if (this.lookRight) {
      image(
        this.img,
        this.pos.center.x,
        this.pos.y,
        this.pos.width,
        this.pos.height
      );
    } else if (!this.lookRight) {
      scale(-1, 1);
      image(
        this.img,
        -this.pos.center.x,
        this.pos.y,
        this.pos.width,
        this.pos.height
      );
    }
    pop();
  }

  // draw the eyes of the character
  drawEyes(generalAlpha) {
    // define the position of the eyes depending on the position of the body
    this.eyes.y = this.pos.y - this.eyes.height;
    this.eyes.x1 = this.pos.center.x;
    if (this.lookRight) {
      this.eyes.x2 = this.pos.center.x + this.eyes.space;
    } else if (!this.lookRight) {
      this.eyes.x2 = this.pos.center.x - this.eyes.space;
    }

    // draw the eyes
    push();
    noStroke();
    fill(this.color1.r, this.color1.g, this.color1.b, generalAlpha);
    ellipse(this.eyes.x1, this.eyes.y, this.eyes.size);
    ellipse(this.eyes.x2, this.eyes.y, this.eyes.size);
    pop();
  }

  // takes care of the movement of the character
  moveCharacter() {
    // call the super class method
    super.moveCharacter();
    // user controlled movement with wasd
    this.userMovement();
  }

  // user controlled movement with wasd
  userMovement() {
    if (keyIsDown(`68`)) {
      // keycode 68 -> `d` key
      this.pos.center.x += this.moveSpeed;
      this.lookRight = true;
      // keep track of the character moving
      this.moving = true;
    } else if (keyIsDown(`65`)) {
      // keycode 68 -> `a` key
      this.pos.center.x -= this.moveSpeed;
      this.lookRight = false;
      // keep track of the character moving
      this.moving = true;
    } else if (keyIsDown(`87`)) {
      // keycode 87 -> `w` key
      this.pos.center.y -= this.moveSpeed;
      // keep track of the character moving
      this.moving = true;
    } else if (keyIsDown(`83`)) {
      // keycode 87 -> `s` key
      this.pos.center.y += this.moveSpeed;
      // keep track of the character moving
      this.moving = true;
    } else {
      this.moving = false;
    }
  }
}
