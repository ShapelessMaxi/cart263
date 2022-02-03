/*
create a word object
*/
class Words {
  contructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = 16;

    if (color === `blue`) {
      this.color = {
        r: 0,
        g: 0,
        b: 0,
      };
    }
  }
}
