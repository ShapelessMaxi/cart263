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
    };

    // refer to the eyes object
    this.eyes = {
      size: 14,
      x1: undefined,
      x2: undefined,
      space: 18,
      y: undefined,
      height: undefined,
    };

    // refer to the character spacing value
    this.characterSpacing = 80;

    // refer to the character's move speed
    this.moveSpeed = 8;

    // takes care of flipping the image when moving
    this.lookRight = true;

    this.nonLeaders = {
      lookRight: true,
    };

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
      this.pos.height = 125;
      this.eyes.height = 25;
      this.leader = true;
    } else if (name === `jack`) {
      this.img = jackImg;
      this.pos.height = 145;
      this.eyes.height = 35;
      this.pos.y = this.pos.center.y - this.pos.height / 2;
      this.leader = false;
    } else if (name === `william`) {
      this.img = williamImg;
      this.pos.height = 170;
      this.eyes.height = 45;
      this.pos.y = this.pos.center.y - this.pos.height / 2;
      this.leader = false;
    } else if (name === `averell`) {
      this.img = averellImg;
      this.pos.height = 195;
      this.eyes.height = 55;
      this.pos.y = this.pos.center.y - this.pos.height / 2;
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
    // user controlled movement with wasd
    this.userMovement();

    // idle animation applied to the character all the time
    this.idleAnimation();
  }

  // user controlled movement with wasd
  userMovement() {
    let delay = 500;
    if (this.leader) {
      // movement for the leader only
      if (keyIsDown(`68`)) {
        // keycode 68 -> `d` key
        this.pos.center.x += this.moveSpeed;
        this.lookRight = true;
        setTimeout(() => {
          this.nonLeaders.lookRight = true;
        }, delay);
      } else if (keyIsDown(`65`)) {
        // keycode 68 -> `a` key
        this.pos.center.x -= this.moveSpeed;
        this.lookRight = false;
        setTimeout(() => {
          this.nonLeaders.lookRight = false;
        }, delay);
      } else if (keyIsDown(`87`)) {
        // keycode 87 -> `w` key
        this.pos.center.y -= this.moveSpeed;
      } else if (keyIsDown(`83`)) {
        // keycode 87 -> `s` key
        this.pos.center.y += this.moveSpeed;
      }
    } else {
      // movement for the non-leader
    }
  }

  // non-leader characters movement
  nonLeaderMovement(delay) {
    // character position is dependant on the character in front of them
    // // orientation of the characters
    // if (!this.joe.lookRight) {
    //   this.jack.lookRight = false;
    //   this.william.lookRight = false;
    //   this.averell.lookRight = false;
    // } else if (this.joe.lookRight) {
    //   this.jack.lookRight = true;
    //   this.william.lookRight = true;
    //   this.averell.lookRight = true;
    // }
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
