/*
create a word object
*/
class Word {
  constructor(x, y, color, mode) {
    // refer to the location, size and angle of the object
    this.x = x;
    this.y = y;
    this.size = random(11, 16);
    this.angle = radians(90);

    // refer to the color of the object (default is white)
    this.color = {
      r: 255,
      g: 255,
      b: 255,
      a: 10,
    };
    // choose the color according to the user's choice
    this.chooseColor(color, mode);

    // refer to the string (default is `word`)
    this.writtenWord = `word`;
    // choose a string in a JSON file
    this.chooseWord();
  }

  // choose the color according to the user's choice (with varying tones)
  chooseColor(color, mode) {
    if (color === `blue`) {
      if (mode === `light`) {
        this.color.r = random(45, 55);
        this.color.g = random(50, 94);
        this.color.b = random(95, 105);
      } else {
        this.color.r = random(90, 100);
        this.color.g = random(95, 160);
        this.color.b = random(180, 190);
      }
    } else if (color === `red`) {
      if (mode === `light`) {
        this.color.r = random(70, 150);
        this.color.g = random(15, 35);
        this.color.b = random(15, 40);
      } else {
        this.color.r = random(180, 190);
        this.color.g = random(50, 75);
        this.color.b = random(50, 60);
      }
    } else if (color === `yellow`) {
      if (mode === `light`) {
        this.color.r = random(160, 210);
        this.color.g = random(180, 210);
        this.color.b = random(90, 100);
      } else {
        this.color.r = random(60, 75);
        this.color.g = random(60, 80);
        this.color.b = random(45, 50);
      }
    }
  }

  // go fetch a string from a JSON file
  chooseWord() {
    // choose a random plant
    let plant = random(plantData.plants);
    // get the string with the `species` tag
    this.writtenWord = plant.species;
  }

  // update the object
  update() {
    this.display();
  }

  // display the object
  display() {
    push();
    textAlign(LEFT, TOP);
    textSize(this.size);
    fill(this.color.r, this.color.g, this.color.b);
    translate(this.x, this.y);
    rotate(this.angle);
    text(this.writtenWord, 0, 0);
    pop();
  }
}
