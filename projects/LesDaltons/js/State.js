/*
General behaviors of other State classes.

-
-
-
-
*/

class State {
  /*
  define variables and arrays
  */
  constructor(color1, color2) {
    // refer to the stripes object
    this.stripes = {
      array: [], // store the stripes
      number: 9,
      w: 50,
      h: height,
    };

    // refer to the overlay object
    this.overlay = {
      w: width,
      h: height,
      alpha: 255,
      fadeSpeed: 3.5,
      animationStarted: false,
      instruction: `click to start`,
    };
  }

  /*
  draw the backgruond
  draw the overlay and make it fade
  */
  update(color1, color2) {
    // draw the background
    this.drawBackground(color1, color2);

    // draw the overlay
    this.drawOverlay(color1, color2);
    // make the overlay fade
    if (this.overlay.animationStarted && this.overlay.alpha >= 0) {
      this.fadeOverlay();
    }
  }

  // draw the background
  drawBackground(color1, color2) {
    // fill the the bcakground with the first color
    background(color1.r, color1.g, color1.b, color1.a);

    // create some stripes
    let spacing = this.stripes.w * 2;
    for (let i = 0; i < this.stripes.number; i++) {
      push();
      rectMode(CORNER);
      noStroke();
      fill(color2.r, color2.g, color2.b, color2.a);
      rect(spacing * i, 0, this.stripes.w, this.stripes.h);
      pop();
    }
  }

  // draw the overlay
  drawOverlay(color1, color2) {
    // draw the overlay rectangle
    push();
    rectMode(CENTER);
    noStroke();
    fill(color2.r, color2.g, color2.b, this.overlay.alpha);
    rect(width / 2, height / 2, this.overlay.w, this.overlay.h);
    pop();
    // draw the text instruction
    push();
    fill(color1.r, color1.g, color1.b, this.overlay.alpha);
    textSize(24);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(this.overlay.instruction, width / 2, height / 2);
    pop();
  }

  // fade in animation for the overlay
  fadeOverlay() {
    this.overlay.alpha -= this.overlay.fadeSpeed;
  }

  /*
  start the fade animation of the overlay
  */
  mousePressed() {
    // check if the overlay is visible
    if (this.overlay.alpha === 255) {
      // start the fade in animation of the overlay
      this.overlay.animationStarted = true;
    }
  }
}
