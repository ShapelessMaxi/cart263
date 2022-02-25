/**
OOP typewriter effect
Pippin Barr
A slightly more sophisticated typewriter effect that allows us
to create multiple typewriters that handle themselves.

Typewriter
Represents a "typewriter" that gradually types out the
provided string on the canvas.
*/

class Typewriter {
  /**
  Takes a string, position, dimensions, and rate and
  creates the required properties to drive a typewriter.
  */
  constructor(string, x, y, w, h, rate, size) {
    this.x = x;
    this.y = y;
    this.string = string;
    this.currentCharacter = 0;
    this.rate = rate;
    this.size = size;
  }

  /**
  Works out the current amount of the string to display,
  displays it, and increments the counter
  */
  update() {
    // What is the current amount of string to display?
    let currentString = this.string.substring(0, this.currentCharacter);

    // Display it
    push();
    textFont(typewriterFont);
    textSize(this.size);
    text(currentString, this.x, this.y, this.w, this.h);
    pop();

    // Increase the current character so that we'll see
    // the next part of the string
    this.currentCharacter += this.rate;
  }
}
