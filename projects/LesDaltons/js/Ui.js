/*
General behaviors of ui objects

> draw basic ui box
> draw and animate the text/narrative
> user able to choose dialogue options
> speaking character profile picture
*/
class Ui {
  constructor() {
    // refer to the main frame object
    this.mainShape = {
      x1: 10,
      y1: 640,
      x2: 990,
      y2: 740,
      bevel: 5,
    };

    // refer to the profile picture object
    this.profileShape = {
      img: 1,
      x1: 15,
      y1: 645,
      x2: 110,
      y2: 735,
      bevel: 5,
    };

    // refer to the typewriter animation object
    this.typewriter = {
      speed: 0.2,
      width: 800,
      height: 100,
    };

    // refer to the main prompt object
    this.mainPrompt = {
      string: `vous êtes maintenant dans votre cellule`,
      x: 130,
      y: 680,
      displayed: false,
      delay: 4800,
    };

    // refer to the secondary prompt object
    this.SecondaryPrompt = {
      string: `vous êtes maintenant dans votre cellule`,
      displayed: false,
    };

    // create the main prompt typewriter
    this.typeMainPrompt = new Typewriter(
      this.mainPrompt.string,
      this.mainPrompt.x,
      this.mainPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed
    );

    // start writting the main prompt after a short delay
    setTimeout(() => {
      this.mainPrompt.displayed = true;
    }, this.mainPrompt.delay);
  }

  /*
  - draw the shapes, the images and the text
  - text writting animation
  */
  update(color1, color2, generalAlpha) {
    // draw the main ui shape
    this.drawMainShape(color1, generalAlpha);
    // draw the profile picture
    this.drawProfile(color2, generalAlpha);

    // draw the main prompt (with typewriter effect)
    if (this.mainPrompt.displayed) {
      this.typeMainPrompt.update();
    }
  }

  // draw the main ui shape
  drawMainShape(color1, generalAlpha) {
    push();
    rectMode(CORNERS);
    fill(color1.r, color1.g, color1.b, generalAlpha);
    noStroke();
    rect(
      this.mainShape.x1,
      this.mainShape.y1,
      this.mainShape.x2,
      this.mainShape.y2,
      this.mainShape.bevel
    );
    pop();
  }

  // draw the profile frame and picture
  drawProfile(color2, generalAlpha) {
    push();
    rectMode(CORNERS);
    fill(color2.r, color2.g, color2.b, generalAlpha);
    noStroke();
    rect(
      this.profileShape.x1,
      this.profileShape.y1,
      this.profileShape.x2,
      this.profileShape.y2,
      this.profileShape.bevel
    );
    pop();
  }

  drawText() {}
}
