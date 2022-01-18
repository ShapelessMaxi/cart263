// class to create a sausage dog
class SausageDog extends Animal {
  constructor(x, y, img) {
    // call the Animal class' contructor
    super(x, y, img);

    // keep track of the user finding the sausage dog
    this.found = false;
    // define the speed of rotation when found
    this.rotationSpeed = 0.25;
  }

  // takes care of drawing the object and applying a rotation when found
  update() {
    // call the Animal class' update method to draw the animal
    super.update();

    // applying a rotation and scale when found
    if (this.found) {
      this.angle += this.rotationSpeed;
      this.scaleNum += 0.15;
    }

    if (this.scaleNum > 20) {
      state = `end`;
    }
  }

  // if you click the sausage dog, find it
  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      // keep track of the sausage dog being found
      this.found = true;
    }
  }
}
