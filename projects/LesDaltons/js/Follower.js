/*
Interactions linked to the Follower characters
Extension of the Dalton class.

> move (and flip) the characters
> draw the characters
*/
class Follower extends Character {
  /*
  define variables
  */
  constructor(name, color1, color2) {
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
      height: undefined,
      // spacing between characters
      spacing: random(70, 80),
    };

    // refer to the eyes object
    this.eyes = {
      size: 14,
      x1: undefined,
      x2: undefined,
      y: undefined,
      height: undefined,
      space: 18,
    };

    /*
    choose depending on the name of the character:
    - the image
    - the image height
    - the height of the eyes
    - if the character is the leader or not
    - the characters movement delay
    */
    if (name === `jack`) {
      this.img = jackImg;
      this.pos.height = 145;
      this.eyes.height = 35;
      this.pos.y = this.pos.center.y - this.pos.height / 2;
      this.movementDelay = random(200, 300);
    } else if (name === `william`) {
      this.img = williamImg;
      this.pos.height = 170;
      this.eyes.height = 45;
      this.pos.y = this.pos.center.y - this.pos.height / 2;
      this.movementDelay = random(300, 400);
    } else if (name === `averell`) {
      this.img = averellImg;
      this.pos.height = 195;
      this.eyes.height = 55;
      this.pos.y = this.pos.center.y - this.pos.height / 2;
      this.movementDelay = random(400, 500);
    }

    // refer to the colors of the character
    this.color1 = color1;
    this.color2 = color2;
  }

  /*
  draw the character
  */
  update(generalAlpha, leader) {
    // draw the character
    this.drawCharacter(generalAlpha);

    // takes care of the character movement
    this.moveCharacter(leader);
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
  moveCharacter(leader) {
    // call the super class method
    super.moveCharacter();

    // following movement
    this.flipMovement(leader);
    this.followingMovement(leader);
  }

  // following movement
  followingMovement(leader) {
    if (leader.moving) {
      // keep track of the character moving
      this.moving = true;
      setTimeout(() => {
        // move up and down
        this.pos.center.y = leader.pos.center.y;
        // move right and left
        if (this.lookRight) {
          this.pos.center.x = leader.pos.center.x - this.pos.spacing;
        } else if (!this.lookRight) {
          this.pos.center.x = leader.pos.center.x + this.pos.spacing;
        }
        // keep track of the character not moving anymore
        this.moving = false;
      }, this.movementDelay);
    }
  }

  // flipping movement
  flipMovement(leader) {
    if (leader.lookRight) {
      setTimeout(() => {
        this.lookRight = true;
      }, this.movementDelay);
    } else if (!leader.lookRight) {
      setTimeout(() => {
        this.lookRight = false;
      }, this.movementDelay);
    }
  }
}
