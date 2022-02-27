/*
Interactions linked to the tunnel state (game scene) are handled here.
Extension of the State class.

> create the main characters
> display and move the characters
> display the end title
*/
class EndState extends State {
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
    this.overlayText = `enfin libre!`;

    // refer to the title object
    this.title = {
      img: endTitle,
      w: 500,
      h: 300,
      x: width / 2,
      y: height / 2,
    };

    // refer to the colors used
    this.color1 = { r: 15, g: 15, b: 15, a: 255 }; // almost black
    this.color2 = { r: 210, g: 200, b: 0, a: 255 }; // bright yellow

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
  fade in the elements when arriving
  */
  update() {
    // call the super class update method
    super.update(this.color1, this.color2, this.skipClick, this.overlayText);

    // draw the title
    this.drawTitle();

    // make the things appear
    this.fadeIn();
  }

  // draw the title
  drawTitle() {
    // draw a rectangle backing
    push();
    noStroke();
    rectMode(CENTER);
    fill(this.color1.r, this.color1.g, this.color1.b, this.appear.generalAlpha);
    rect(this.title.x, this.title.y, this.title.w, this.title.h);
    pop();
    // draw image title
    push();
    tint(this.color2.r, this.color2.g, this.color2.b, this.appear.generalAlpha);
    imageMode(CENTER);
    image(this.title.img, this.title.x, this.title.y, 400, 200);
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

  /*
  - takes care of the navigation between states (scenes)
  */
  keyPressed() {
    // call the super class method
    super.keyPressed();
  }

  /*
  call the super class update mousePressed method
  */
  mousePressed() {
    // call the super class update mousePressed method
    super.mousePressed();
  }
}
