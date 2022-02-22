/*
General behaviors of ui objects

> draw basic ui box
> draw and animate the text/narrative
> user able to choose dialogue options
> speaking character profile picture
*/
class Ui {
  constructor(color1, color2) {
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
      x2: 210,
      y2: 735,
      bevel: 5,
    };

    // refer to the tools object
    this.toolShape = {
      bevel: 5,
      pickaxe: {
        img: undefined,
        displayed: false,
        x1: 790,
        y1: 685,
        x2: 885,
        y2: 735,
        bevel: 5,
      },
      spoons: {
        img: undefined,
        displayed: false,
        x1: 890,
        y1: 685,
        x2: 985,
        y2: 735,
        bevel: 5,
      },
    };

    // refer to the profile picture object
    this.timeShape = {
      x1: 790,
      y1: 645,
      x2: 985,
      y2: 680,
      bevel: 5,
    };

    // refer to the typewriter animation object
    this.typewriter = {
      speed: 0.8,
      width: 800,
      height: 100,
    };

    // refer to the main prompt object
    this.mainPrompt = {
      string: `vous êtes maintenant dans votre cellule`,
      x: 230,
      y: 670,
      size: 16,
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
      this.typewriter.speed,
      this.mainPrompt.size
    );

    // refer to the colors of the ui
    this.color1 = color1;
    this.color2 = color2;

    // start writting the main prompt after a short delay
    setTimeout(() => {
      this.mainPrompt.displayed = true;
    }, this.mainPrompt.delay);
  }

  /*
  - draw the shapes, the images and the text
  - text writting animation
  */
  update(generalAlpha) {
    // draw the main ui shape
    this.drawShape(this.mainShape, this.color1, generalAlpha);
    // draw the profile shape
    this.drawShape(this.profileShape, this.color2, generalAlpha);
    // draw the tool shapes picture
    this.drawShape(this.toolShape.pickaxe, this.color2, generalAlpha);
    this.drawShape(this.toolShape.spoons, this.color2, generalAlpha);
    // draw the time and date
    this.drawTimer(generalAlpha);

    // draw the main prompt (with typewriter effect)
    if (this.mainPrompt.displayed) {
      this.typeMainPrompt.update();
    }
  }

  // draw the main ui shape
  drawShape(shapeType, color, generalAlpha) {
    push();
    rectMode(CORNERS);
    fill(color.r, color.g, color.b, generalAlpha);
    noStroke();
    rect(
      shapeType.x1,
      shapeType.y1,
      shapeType.x2,
      shapeType.y2,
      shapeType.bevel
    );
    pop();
  }

  // draw the profile frame and picture
  drawTimer(generalAlpha) {
    // draw the shape of the timer
    this.drawShape(this.timeShape, this.color2, generalAlpha);

    // activate the timer
    this.countTime();

    // draw the text for the timer
    this.drawTimerText(generalAlpha);
  }

  // draw the text for the timer
  drawTimerText(generalAlpha) {
    // check if it is am or pm
    let suffix;
    if (recordedTime.hours > 11) {
      suffix = `pm`;
    } else {
      suffix = `am`;
    }

    // draw the text of the timer
    push();
    fill(this.color1.r, this.color1.g, this.color1.b, generalAlpha);
    textAlign(CENTER, CENTER);
    textSize(16);
    let date = `${this.displayTimer(
      recordedTime.day
    )}/08/2001 - ${this.displayTimer(recordedTime.hours)}:${this.displayTimer(
      recordedTime.minutes
    )} ${suffix}`;
    text(date, 888, 665);
    pop();
  }

  // display the days, hours and minutes (add '0' when needed)
  displayTimer(time) {
    if (time >= 10) {
      let num = `${int(time)}`;
      return num;
    } else if (time < 10) {
      let num = `0${int(time)}`;
      return num;
    }
  }

  // counting time,day, hours and minutes
  countTime() {
    if (frameCount % 3 === 0) {
      // minutes going up
      recordedTime.minutes += 0.1;
      if (recordedTime.minutes > 60) {
        recordedTime.minutes = 0;
        // hours going up
        recordedTime.hours += 1;
      }
      // day reset
      if (recordedTime.hours > 12) {
        // days going up
        recordedTime.day += 1;
        recordedTime.hours = 1;
      }
    }
  }
}
