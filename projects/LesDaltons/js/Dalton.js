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
    this.y = height - 300;
    // width of the character
    this.w = 62;

    this.eyes = {
      size: 14,
      x1: undefined,
      x2: undefined,
      space: 18,
      y: undefined,
    };

    // takes care of flipping the image when moving
    this.lookRight = true;

    /*
    choose:
    - the image
    - the image height
    - the height of the eyes depending on the name of the character
    - if the character is the leader or not
    */
    if (name === `joe`) {
      this.img = joeImg;
      this.h = 170;
      this.eyeHeight = 52;
      this.leader = true;
    } else if (name === ``) {
    } else if (name === ``) {
    } else if (name === ``) {
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
    if (this.leader) {
      if (keyIsDown(`68`)) {
        // keycode 68 -> `d` key
        this.x += 3;
        this.lookRight = true;
      } else if (keyIsDown(`65`)) {
        // keycode 68 -> `a` key
        this.x -= 3;
        this.lookRight = false;
      } else if (keyIsDown(`87`)) {
        // keycode 87 -> `w` key
        this.y -= 2;
      } else if (keyIsDown(`83`)) {
        // keycode 87 -> `s` key
        this.y += 2;
      }
    }
    // constrain the character to the screen
    this.x = constrain(this.x, -50, width + 50);
    // constrain the character to the floor
    this.y = constrain(this.y, height - 300, height - 100);
  }
}
