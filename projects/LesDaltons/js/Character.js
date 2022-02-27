/*
General behaviors of other -Character subclasses.

> apply idle animation
> constrain the character to a bit more than the screen (defined in the state classes)
*/
class Character {
  /*
  -define variables
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

    // refer to the position and size parameters (defined in Leader and Follower subclasses)
    this.pos = {
      center: {
        x: undefined,
        y: undefined,
      },
      height: undefined,
    };
  }

  /*
  apply movement to the character
  */
  update(color1, color2, generalAlpha) {
    // takes care of the character movement
    this.moveCharacter();
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
    this.pos.center.y = constrain(
      this.pos.center.y,
      characterRange.y1,
      characterRange.y2
    );
  }
}
