/*
Interactions linked to the intro state are handled here.
Extension of the State class.

-
-
-
-
*/

class IntroState extends State {
  /*
  call the super class constructor
  define variables and arrays
  */
  constructor() {
    // call the super class constructor
    super();

    // decide if we should skip having to click to fade out the overlay
    this.skipClick = false;

    // refer to the colors used
    this.color1 = { r: 15, g: 15, b: 15, a: 255 }; // almost black
    this.color2 = { r: 210, g: 200, b: 0, a: 255 }; // bright yellow

    // refer to the text on the overlay
    this.overlayText = `click to start`;

    // refer to the title object
    this.tittle = {
      str: `Les Daltons : Prison Break`,
      w: 750,
      h: 100,
      x: width / 2,
      y: 200,
    };
    // refer to the instruction object
    this.instructions = {
      str1: `-> you control Joe (the little one) <-`,
      str2: `-> you move with 'wasd' <-`,
      str3: `-> you interact with 'e' <-`,
      textSpacing: 50,
      textSize: 18,
      w: 450,
      h: 200,
      x: width / 2,
      y: 600,
    };

    // refer to the object taking care of making the things appear
    this.appear = {
      generalAlpha: 0,
      speed: 10,
      animationStarted: false,
      delay: 1000,
    };
  }

  /*
  call the super class update method
  draw the title
  */
  update() {
    // call the super class update method
    super.update(this.color1, this.color2, this.skipClick, this.overlayText);

    // draw the title
    this.drawTitle();
    // draw the instrucions
    this.drawInstructions();

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
    rect(this.tittle.x, this.tittle.y, this.tittle.w, this.tittle.h);
    pop();
    // draw the text
    push();
    fill(this.color2.r, this.color2.g, this.color2.b, this.appear.generalAlpha);
    textSize(50);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(this.tittle.str, this.tittle.x, this.tittle.y);
    pop();
  }

  // draw the instrucions
  drawInstructions() {
    // draw a rectangle backing
    push();
    noStroke();
    rectMode(CENTER);
    fill(this.color2.r, this.color2.g, this.color2.b, this.appear.generalAlpha);
    rect(
      this.instructions.x,
      this.instructions.y,
      this.instructions.w,
      this.instructions.h
    );
    pop();
    // draw the text
    push();
    fill(this.color1.r, this.color1.g, this.color1.b, this.appear.generalAlpha);
    textSize(this.instructions.textSize);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    let x = this.instructions.x;
    let y1 = this.instructions.y - this.instructions.textSpacing;
    text(this.instructions.str1, x, y1);
    let y2 = this.instructions.y;
    text(this.instructions.str2, x, y2);
    let y3 = this.instructions.y + this.instructions.textSpacing;
    text(this.instructions.str3, x, y3);
    pop();
  }

  // fade in animation for various elements
  fadeIn() {
    if (this.appear.animationStarted && this.appear.generalAlpha <= 255) {
      this.appear.generalAlpha += this.appear.speed;
    }
  }

  /*
  call the super class update mousePressed method
  start the appear animation
  change to the cell state
  */
  mousePressed() {
    // call the super class update mousePressed method
    super.mousePressed();

    // check if the appear animation has started
    if (!this.appear.animationStarted) {
      // start the fade in animation of the overlay after 1 seconds
      setTimeout(() => {
        this.appear.animationStarted = true;
      }, this.appear.delay);
    }

    // check if the things are fully visisble
    if (this.appear.generalAlpha > 250) {
      // change the state to the cell state
      state = new CellState();
    }
  }
}
