// class to create button objects
class Button {
  constructor(x, y, difficulty, color) {
    // define the position
    this.x = x;
    this.y = y;
    // define the difficulty (text on the button)
    this.difficulty = difficulty;
    // define the color
    this.color = color;

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
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    pop();

    // draw the text (difficulty)
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(25);
    textFont(titleFont);
    text(this.difficulty, this.x, this.y);
    pop();
  }

  // checks if a point (x,y) overlaps with the animal
  overlap(x, y) {}

  // if you click the button, change the state and set difficulty of the game
  mousePressed() {}
}
