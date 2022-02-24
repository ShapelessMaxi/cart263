/*
Interactions linked to the Leader character
Extension of the Dalton class.

>
>
>
>
*/
class Npc extends Character {
  /*
  define variables and arrays
  */
  constructor(img, color1, color2) {
    // call super class constructor
    super();

    // refer to the position and size parameters
    this.pos = {
      // center of the character (draw image with CENTER mode)
      center: {
        x: 884,
        y: 495,
      },
      // bottom of the character
      y: undefined,
      // height and width
      width: 80,
      height: 220,
    };

    // refer to the image of the character
    this.img = img;

    // refer to the eyes object
    this.eyes = {
      size: 12,
      x1: undefined,
      x2: undefined,
      y: undefined,
      space: 14,
      height: 55,
    };

    // refer to the colors of the character
    this.color1 = color1;
    this.color2 = color2;
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
    image(
      this.img,
      this.pos.center.x,
      this.pos.y,
      this.pos.width,
      this.pos.height
    );
    pop();
  }

  // draw the eyes of the character
  drawEyes(generalAlpha) {
    // define the position of the eyes depending on the position of the body
    this.eyes.y = this.pos.y - this.eyes.height;
    this.eyes.x1 = this.pos.center.x;
    this.eyes.x2 = this.pos.center.x - this.eyes.space;

    // draw the eyes
    push();
    noStroke();
    fill(this.color1.r, this.color1.g, this.color1.b, generalAlpha);
    ellipse(this.eyes.x1, this.eyes.y, this.eyes.size);
    ellipse(this.eyes.x2, this.eyes.y, this.eyes.size);
    pop();
  }
}
