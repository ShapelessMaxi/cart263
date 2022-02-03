/*
create a word object
*/
class Word {
  constructor(x, y, color, mode) {
    this.x = x;
    this.y = y;
    this.size = 25;
    this.angle = radians(90);

    this.color = {
      r: 255,
      g: 255,
      b: 255,
    };
    this.chooseColor(color, mode);

    this.writtenWord = `word`;
    this.chooseWord();
  }

  // choose the color awith different tones
  chooseColor(color, mode) {
    if (color === `blue`) {
      if (mode === `light`) {
        this.color.r = random(90, 100);
        this.color.g = random(95, 160);
        this.color.b = random(180, 190);
      } else {
        this.color.r = random(45, 55);
        this.color.g = random(50, 94);
        this.color.b = random(95, 105);
      }
    } else if (color === `red`) {
      if (mode === `light`) {
        this.color.r = random(180, 190);
        this.color.g = random(50, 75);
        this.color.b = random(70, 90);
      } else {
        this.color.r = random(30, 50);
        this.color.g = random(0, 15);
        this.color.b = random(0, 20);
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

  // go fetch a word from a JSON file
  chooseWord() {
    // choose a random instrument for the alias
    let plant = random(plantData.plants);
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
