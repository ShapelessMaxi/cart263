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
  constructor() {
    // keeps track of the orientation of the character
    this.lookRight = true;

    // keeps track of the character moving
    this.moving = false;

    // refer to the object used to control the idle animation
    this.idleAnim = {
      tall: true,
      speed: 4, // the higher this value is, the lower the speed of the animation
      change1: 1,
      change2: 7,
    };
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
    // set the actual position of the character
    this.pos.y = this.pos.center.y - this.pos.height / 2;

    let lookingRight;
    if (this.leader) {
      lookingRight = this.lookRight;
    } else {
      lookingRight = this.nonLeaders.lookRight;
    }
    // draw the main body
    this.drawBody(color1, generalAlpha, lookingRight);
    // draw the head
    this.drawEyes(color2, generalAlpha, lookingRight);
  }

  // draw the image of the character
  drawBody(color1, generalAlpha, lookingRight) {
    push();
    imageMode(CENTER);
    tint(color1.r, color1.g, color1.b, generalAlpha);
    if (lookingRight) {
      image(
        this.img,
        this.pos.center.x,
        this.pos.y,
        this.pos.width,
        this.pos.height
      );
    } else if (!lookingRight) {
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
  drawEyes(color2, generalAlpha) {
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
    fill(color2.r, color2.g, color2.b, generalAlpha);
    ellipse(this.eyes.x1, this.eyes.y, this.eyes.size);
    ellipse(this.eyes.x2, this.eyes.y, this.eyes.size);
    pop();
  }

  // takes care of the movement of the character
  moveCharacter() {
    // idle animation applied to the character all the time
    this.idleAnimation();
  }

  // idle animation
  idleAnimation() {
    if (frameCount % this.idleAnim.speed === 0) {
      if (this.idleAnim.tall) {
        this.pos.height -= this.idleAnim.change1;
        this.pos.height -= this.idleAnim.change2;
        this.idleAnim.tall = false;
      } else {
        this.pos.height += this.idleAnim.change1;
        this.pos.height += this.idleAnim.change2;
        this.idleAnim.tall = true;
      }
    }
  }

  // constrain the character to an area of the screen
  screenConstrain(characterRange) {
    // constrain the character to the screen
    this.pos.center.x = constrain(
      this.pos.center.x,
      characterRange.x1,
      characterRange.x2
    );
    // constrain the character to the floor
    this.pos.y = constrain(this.pos.y, characterRange.y1, characterRange.y2);
  }
}
