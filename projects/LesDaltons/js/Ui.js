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
    this.portrait = {
      img: daltonsPortrait,
      x1: 15,
      y1: 645,
      x2: 280,
      y2: 735,
      bevel: 5,
    };

    // refer to the tools object
    this.tools = {
      bevel: 5,
      pickaxe: {
        img: pickaxIcon,
        displayed: false,
        x1: 790,
        y1: 685,
        x2: 885,
        y2: 735,
        bevel: 5,
      },
      spoon: {
        img: spoonIcon,
        displayed: false,
        x1: 890,
        y1: 685,
        x2: 985,
        y2: 735,
        bevel: 5,
      },
    };

    // refer to the profile picture object
    this.time = {
      x1: 790,
      y1: 645,
      x2: 985,
      y2: 680,
      bevel: 5,
    };

    // refer to the colors of the ui
    this.color1 = color1;
    this.color2 = color2;
  }

  /*
  - draw the shapes, the images and the text
  - text writting animation
  */
  update(generalAlpha) {
    // draw the main ui shape
    this.drawShape(this.mainShape, this.color1, generalAlpha);
    // draw the portrits and the portrait box
    this.drawShape(this.portrait, this.color2, generalAlpha);
    this.drawImage(this.portrait, generalAlpha);
    // draw the tools and ui tool boxes
    this.drawShape(this.tools.pickaxe, this.color2, generalAlpha);
    this.drawShape(this.tools.spoon, this.color2, generalAlpha);
    if (this.tools.pickaxe.displayed) {
      this.drawImage(this.tools.pickaxe, generalAlpha);
    }
    if (this.tools.spoon.displayed) {
      this.drawImage(this.tools.spoon, generalAlpha);
    }
    // draw the time and date
    this.drawTimer(generalAlpha);
  }

  // draw a rectangle shape
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

  // draw the portrait image
  drawImage(icon, generalAlpha) {
    push();
    imageMode(CORNERS);
    tint(this.color1.r, this.color1.g, this.color1.b, generalAlpha);
    image(icon.img, icon.x1, icon.y1, icon.x2, icon.y2);
    pop();
  }

  // draw the profile frame and picture
  drawTimer(generalAlpha) {
    // draw the shape of the timer
    this.drawShape(this.time, this.color2, generalAlpha);

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
