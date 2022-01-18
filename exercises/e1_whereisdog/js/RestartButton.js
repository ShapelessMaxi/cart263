// class to create button objects
class RestartButton {
  constructor(x, y) {
    // define the position
    this.x = x;
    this.y = y;
    // define the color
    this.color = color(224, 54, 188);
    this.hoverColor = 100;

    // define the size
    this.w = 100;
    this.h = 50;
  }

  // takes care of drawing the object
  update() {
    this.display();
  }

  // takes care of drawing the object
  display() {
    // draw the basic shape
    push();
    stroke(255);
    strokeWeight(3);
    rectMode(CENTER);
    if (this.overlap(mouseX, mouseY)) {
      fill(this.hoverColor);
    } else {
      fill(this.color);
    }
    rect(this.x, this.y, this.w, this.h);
    pop();

    // draw the text (difficulty)
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(25);
    textFont(titleFont);
    text(`restart?`, this.x, this.y);
    pop();
  }

  // checks if a point (x,y) overlaps with the animal
  overlap(x, y) {
    if (
      x > this.x - this.w / 2 &&
      x < this.x + this.w / 2 &&
      y > this.y - this.h / 2 &&
      y < this.y + this.h / 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  // if you click the button, change the state and set difficulty of the game
  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      // change the state
      state = `menu`;

      // reset the sausage dog variables
      sausageDog.found = false;
      sausageDog.scaleNum = 1;
      sausageDog.angle = 0;

      // reset the animals' positions
      this.resetPositions();
    }
  }

  // reset the animals' positions
  resetPositions() {
    // reset the animals' positions
    for (let i = 0; i < animals.length; i++) {
      animals[i].x = random(0, width);
      animals[i].y = random(0, height);
    }
    // reset the sausage dog's position
    sausageDog.x = random(0, height);
    sausageDog.y = random(0, height);
  }
}
