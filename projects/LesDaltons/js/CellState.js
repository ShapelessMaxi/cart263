/*
Interactions linked to the cell state (first game scene) are handled here.
Extension of the State class.

>
>
>
>
*/
class CellState extends State {
  /*
  call the super class constructor
  define variables and arrays
  */
  constructor() {
    // call the super class constructor
    super();

    // decide if we should skip having to click to fade out the overlay
    this.skipClick = true;

    // refer to the text on the overlay
    this.overlayText = `the dalton's cell`;

    // refer to the colors used
    this.color1 = { r: 210, g: 200, b: 0, a: 255 }; // bright yellow
    this.color2 = { r: 15, g: 15, b: 15, a: 255 }; // almost black

    // refer to the floor
    this.floor = {
      x1: 0,
      y1: 450,
      x2: 1000,
      y2: 750,
    };

    // refer to the object taking care of making the things appear
    this.appear = {
      generalAlpha: 0,
      speed: 8,
      animationStarted: false,
      delay: 2000,
    };

    // create the characters
    this.joe = new Dalton(`joe`);
    this.jack = new Dalton(`jack`);
    this.william = new Dalton(`william`);
    this.averell = new Dalton(`averell`);
    // store the characters here
    this.daltons = [this.joe, this.jack, this.william, this.averell];

    // create the ui
    this.ui = new Ui();

    // start making the things appear
    this.startFadeIn();
  }

  /*
  call the super class update method
  */
  update() {
    // call the super class update method
    super.update(this.color1, this.color2, this.skipClick, this.overlayText);

    // draw the floor
    this.drawFloor();

    // make the things appear
    this.fadeIn();

    // update the character objects
    this.joe.update(this.color2, this.color1, this.appear.generalAlpha);
    this.jack.update(this.color2, this.color1, this.appear.generalAlpha);
    this.william.update(this.color2, this.color1, this.appear.generalAlpha);
    this.averell.update(this.color2, this.color1, this.appear.generalAlpha);

    // constrain the character to an area of the screen
    let characterRange = {
      x1: -50,
      x2: width + 50,
      y1: this.floor.y1,
      y2: height - 100,
    };
    this.joe.screenConstrain(characterRange);
    this.jack.screenConstrain(characterRange);
    this.william.screenConstrain(characterRange);
    this.averell.screenConstrain(characterRange);

    // draw the ui
    this.ui.update(this.color1, this.color2, this.appear.generalAlpha);
  }

  // draw the floor
  drawFloor() {
    // draw a rectangle for the floor
    push();
    rectMode(CORNERS);
    noStroke();
    fill(this.color2.r, this.color2.g, this.color2.b, this.appear.generalAlpha);
    rect(this.floor.x1, this.floor.y1, this.floor.x2, this.floor.y2);
    pop();
  }

  // start to make things appear
  startFadeIn() {
    //check if the fade in animation has started
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

  /*
  call the super class update mousePressed method
  */
  mousePressed() {
    // call the super class update mousePressed method
    super.mousePressed();
  }
}
