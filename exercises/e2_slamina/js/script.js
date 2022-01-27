/*
Maxime Perreault
Slamina +

Do you think you've done bad things recently, or just in your life?
surely you did.
confess.

the user is prompted to confess their sins to the computer. its a computer, what could happen?
the computer listens... and react to different keywords.
theres a counter of good, and another counter of bad...
the screen gets darker as you say bad things, and lighter as you tell good things.
*/

"use strict";

// list of possible bad words
const badWords = /kill|killed|drink|drank|satan/;

// list of possible good words
const goodWords = /love|loved|give|gave|help|helped/;

// store the current answer from the user
let currentAnswer = undefined;

// create a canvas, set up the annyang commands, set up the text format
function setup() {
  // create a canvas
  createCanvas(windowWidth, windowHeight);

  // checks if annyang is installed correctly
  if (annyang) {
    // create a voice command
    let commands = {
      "*everything": listening,
    };
    annyang.addCommands(commands);
    annyang.start();

    // set up the text format
    textSize(150);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
  } else {
    alert('load this "page" in Google Chrome plz!');
  }
}

// draw the visual elements
function draw() {
  // draw the background
  background(150, 100, 100);
}

// listens to the user confessing their sins
function listening(everything) {
  // check if the user said 'bad' keywords
  let saidBad = badWords.test(everything);
  // check if the user said 'good' keywords
  let saidGood = goodWords.test(everything);

  // actions depending on what type of word the user said
  if (saidBad && saidGood) {
    // user said a good and a bad word
  } else if (saidBad) {
    // user said a bad word
  } else if (saidGood) {
    // user said a good word
  } else {
    // user said neither a good or a bad word
  }
}
