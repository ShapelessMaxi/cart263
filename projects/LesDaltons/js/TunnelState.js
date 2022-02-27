/*
Interactions linked to the tunnel state (game scene) are handled here.
Extension of the State class.

> create the main characters
> display and move the characters
>
>
>
*/
class TunnelState extends State {
  /*
  call the super class constructor
  define variables and arrays
  create the characters
  */
  constructor() {
    // call the super class constructor
    super();

    // decide if we should skip having to click to fade out the overlay
    this.skipClick = true;
    // refer to the text on the overlay
    this.overlayText = `le tunnel`;

    // refer to the colors used
    this.color1 = { r: 70, g: 50, b: 35, a: 255 }; // brown
    this.color2 = { r: 15, g: 15, b: 15, a: 255 }; // almost black

    // refer to the floor
    this.floor = {
      x1: 0,
      y1: 650,
      x2: 1000,
      y2: 750,
    };
    // refer to the ceilling
    this.ceilling = {
      x1: 0,
      y1: 0,
      x2: 1000,
      y2: 450,
    };

    // create the characters
    this.joe = new Leader(this.color1, this.color2);
    this.jack = new Follower(`jack`, this.color1, this.color2);
    this.william = new Follower(`william`, this.color1, this.color2);
    this.averell = new Follower(`averell`, this.color1, this.color2);

    // refer to the typewriter animation object
    this.typewriter = {
      speed: 0.8,
      width: 800,
      height: 100,
    };
    // refer to the main prompt object
    this.navigationPrompt = {
      string: `tape sur 'X' pour gouter à la liberté`,
      x: 220,
      y: 200,
      size: 24,
      color: this.color1,
    };
    // create the main prompt typewriter
    this.typeNavigation = new Typewriter(
      this.navigationPrompt.string,
      this.navigationPrompt.x,
      this.navigationPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed,
      this.navigationPrompt.size,
      this.navigationPrompt.color
    );

    // refer to the object taking care of making the things appear
    this.appear = {
      generalAlpha: 0,
      speed: 8,
      animationStarted: false,
      delay: 2000,
    };
    // start making the things appear
    this.startFadeIn();
  }

  /*
  call the super class update method
  draw the floor
  update and constrain the characters
  fade in the elements when arriving
  */
  update() {
    // call the super class update method
    super.update(this.color1, this.color2, this.skipClick, this.overlayText);

    // draw the floor
    this.drawShape(this.floor);
    // draw the ceilling
    this.drawShape(this.ceilling);

    // update the character objects
    this.charactersUpdate();

    //   draw the navigation prompt
    this.drawNavigationPrompt();

    // make the things appear
    this.fadeIn();
  }

  // update the characters
  charactersUpdate() {
    this.joe.update(this.appear.generalAlpha);
    this.jack.update(this.appear.generalAlpha, this.joe);
    this.william.update(this.appear.generalAlpha, this.jack);
    this.averell.update(this.appear.generalAlpha, this.william);

    // constrain the character to an area of the screen
    let characterRange = {
      x1: -200,
      x2: width + 200,
      y1: this.floor.y1 + 10,
      y2: height - 45,
    };
    this.joe.screenConstrain(characterRange);
    this.jack.screenConstrain(characterRange);
    this.william.screenConstrain(characterRange);
    this.averell.screenConstrain(characterRange);
  }

  // draw a rectangle shape
  drawShape(type) {
    push();
    rectMode(CORNERS);
    noStroke();
    fill(this.color2.r, this.color2.g, this.color2.b, this.appear.generalAlpha);
    rect(type.x1, type.y1, type.x2, type.y2);
    pop();
  }

  // start to make things appear
  startFadeIn() {
    if (!this.appear.animationStarted) {
      // start the fade in animation of the overlay after 1 seconds
      setTimeout(() => {
        this.appear.animationStarted = true;
      }, this.appear.delay);
    }
  }

  // fade in animation for various elements
  fadeIn() {
    if (this.appear.animationStarted && this.appear.generalAlpha <= 255) {
      this.appear.generalAlpha += this.appear.speed;
    }
  }

  // draw the navigation prompt
  drawNavigationPrompt() {
    // display the navigation instruction
    if (this.joe.pos.center.x > width) {
      this.typeNavigation.update();
    }
  }

  /*
  - takes care of the navigation between states (scenes)
  */
  keyPressed() {
    // call the super class method
    super.keyPressed();

    // navigation between states
    this.navigation();
  }

  // navigation between states
  navigation() {
    // navigation to the cell
    if (this.joe.pos.center.x > width) {
      if (key === `x`) {
        // go to the cell scene
        state = new Endtate();
      }
    }
  }

  /*
  call the super class update mousePressed method
  */
  mousePressed() {
    // call the super class update mousePressed method
    super.mousePressed();
  }
}
