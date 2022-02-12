/*
Interactions linked to the intro state are handled here.
Extension of the State class.

-
-
-
-
*/

class IntroState extends State {
  /*
  call the super class constructor
  define variables and arrays
  */
  constructor() {
    // call the super class constructor
    super();

    // refer to the color used
    this.color1 = { r: 220, g: 220, b: 0, a: 255 }; // bright yellow
    this.color2 = { r: 10, g: 10, b: 10, a: 255 }; // almost black
  }

  /*
  call the super class update method
  */
  update() {
    // call the super class update method
    super.update(this.color1, this.color2);
  }

  /*
  call the super class update mousePressed method
  */
  mousePressed() {
    // call the super class update mousePressed method
    super.mousePressed();
  }
}
