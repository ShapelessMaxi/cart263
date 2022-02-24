/*
General behaviors of other -State subclasses.

> draw a striped background using color defined in the subclasses with the -State suffix
> draw an overlay that fades out when the mouse is pressed (option to have it fade without the click defined in the subclasses)
>
>
*/
class State {
  /*
  define variables and arrays
  */
  constructor() {
    // refer to the stripes object
    this.stripes = {
      array: [], // store the stripes
      number: 15,
      w: 40,
      h: height,
    };

    // refer to the overlay object
    this.overlay = {
      textSize: 24,
      w: width,
      h: height,
      alpha: 255,
      fadeSpeed: 3,
      animationStarted: false,
    };
  }

  /*
  draw the backgruond
  draw the overlay and make it fade
  */
  update(color1, color2, skipClick, overlayText) {
    // draw the background
    this.drawBackground(color1, color2);

    // draw the overlay
    this.drawOverlay(color1, color2, overlayText);
    // make the overlay fade
    this.startFadeOverlay(skipClick);

    if (
      recordedData.day === recordedData.visit.day &&
      recordedData.month === recordedData.month
    ) {
      this.drawVisitAlert();
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
  drawOverlay(color1, color2, overlayText) {
    // draw the overlay rectangle
    push();
    rectMode(CENTER);
    noStroke();
    fill(color1.r, color1.g, color1.b, this.overlay.alpha);
    rect(width / 2, height / 2, this.overlay.w, this.overlay.h);
    pop();
    // draw the text instruction
    push();
    fill(color2.r, color2.g, color2.b, this.overlay.alpha);
    textSize(this.overlay.textSize);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(overlayText, width / 2, height / 2);
    pop();
  }

  // start the fade out animation
  startFadeOverlay(skipClick) {
    // check if the animation started and if the alpha value is more than 0
    if (this.overlay.animationStarted && this.overlay.alpha >= 0) {
      this.fadeOverlay();
    }
    // OR check if we decided to skip clicking to start the animation (defined in subcalsses)
    if (skipClick) {
      // start the fade out animation 1 second later
      setTimeout(this.fadeOverlay.bind(this), 800);
    }
  }

  //fade out animation for the overlay
  fadeOverlay() {
    this.overlay.alpha -= this.overlay.fadeSpeed;
  }

  drawVisitAlert() {
    push();
    fill(200, 100, 100);
    noStroke();
    rectMode(CORNERS);
    rect(0, 0, width, height);
    pop();
  }

  /*
  takes care of recordeding the user's keyboard input
  */
  keyPressed() {}

  /*
  start the fade animation of the overlay
  */
  mousePressed() {
    // check if the overlay is visible
    if (!this.overlay.animationStarted) {
      // start the fade in animation of the overlay
      this.overlay.animationStarted = true;
    }
  }
}
