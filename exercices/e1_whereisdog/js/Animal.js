// class to create an animal
class Animal {
  constructor(x, y, img) {
    // define the position
    this.x = x;
    this.y = y;
    // define which image to use
    this.img = img;

    // define an angle for the rotation of the animal
    // 0 because we dont want the animals to rotate, just the sausage dog
    this.angle = 0;

    // define a scale number for making the animal bigger
    // 1 because we dont want the animals to get bigger, just the sausage dog
    this.scaleNum = 1;
  }

  // takes care of drawing the object and applying a rotation
  update() {
    this.display();
  }

  // takes care of drawing the object and applying a rotation
  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    scale(this.scaleNum);
    image(this.img, 0, 0);
    pop();
  }

  // checks if a point (x,y) overlaps with the animal
  overlap(x, y) {
    if (
      x > this.x - this.img.width / 2 &&
      x < this.x + this.img.width / 2 &&
      y > this.y - this.img.height / 2 &&
      y < this.y + this.img.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
