/*
Maxime Perreault
Slamina +

Do you think you've done bad things recently?
surely you did. ill even listen to the good things!
confess.

the user is prompted to confess their sins to the computer. its a computer, what could happen?
the computer listens... and react to different keywords.
theres a counter of good, and another counter of bad...
the screen gets darker as you say bad things, and lighter as you tell good things.
*/

"use strict";

// store the background image here
let bg = undefined;
// object properties for red overlay background filter
let filter = {
  color: {
    r: 255,
    g: 100,
    b: 100,
  },
  alpha: {
    current: 70,
    min: 15,
    max: 30,
  },
  animDriver: 0,
};

// object properties for the first scrolling prompt
let prompt1 = {
  x1: -100,
  x2: undefined,
  speed: 2.2
}
// object properties for the second scrolling prompt
let prompt2 = {
  x1: -100,
  x2: undefined,
  speed: 1.8
}

// list of possible bad words
const badWords = /kill|killed|drink|drank|satan|sex|cum|porn|rape|hide|hid|jealous|jealousy|lazy|hell|attacked|attack|envy|lust|pride|greed|fuck|damn|bitch|cunt|bastard|slut|profanities|whore|prostitution|prostitute/;

// list of possible good words
const goodWords = /love|loved|give|gave|help|helped|innocent|favor|clear|straight|humility|patience|patient|diligent|diligence|abstinence|loyal|loyalty|chastity|heal|healed|served|service|right|harmless|proper|beauty|grace/;

// store the current answer from the user
let currentAnswer = undefined;

// load imgaes, create a canvas, set up the annyang commands
function setup() {
  // load images
  bg = loadImage(`assets/images/starbg.png`);

  // create a canvas
  createCanvas(windowWidth, windowHeight);

  // set the position of the scrolling prompts duplicates
  prompt1.x2 = width;
  prompt2.x2 = width + 300;

  // checks if annyang is installed correctly
  if (annyang) {
    // create a voice command listening to what the user says
    let commands = {
      "*everything": listening,
    };
    annyang.addCommands(commands);
    annyang.start();
  } else {
    alert('load this "page" in Google Chrome plz!');
  }
}

// draw the visual elements
function draw() {
  // draw the background
  backgroundElements();

  // draw the game prompt
  promptElements()

  // prompt anmimation going right to left
  promptAnimation();
}

// draw the background elements
function backgroundElements() {
  // draw a white layer
  background(255, 255, 255);

  // draw a red flashing layer
  push();
  rectMode(CORNERS);
  fill(filter.color.r, filter.color.g, filter.color.b, filter.alpha.current);
  rect(0, 0, width, height);
  pop();
  // animate the red layer
  backgroundAnimation();

  // draw a blue star cutout layer (image)
  push();
  imageMode(CORNERS);
  image(bg, 0, 0, width, height);
  pop();
}

function promptElements() {
  // set up the text format
  push();
  textSize(100);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  fill(filter.color.r, filter.color.g, filter.color.b, 80);
  text(`confess your sins, out loud, pls.`, prompt1.x1, 200);
  text(`confess your sins, out loud, pls.`, prompt1.x2, 200);
  text(`am computer, nothing will happen :-)`, prompt2.x1, height - 200);
  text(`am computer, nothing will happen :-)`, prompt2.x2, height - 200);
  pop();
}

// animate the flickering background
function backgroundAnimation() {
  filter.animDriver += 1;
  filter.alpha.current = cos(filter.animDriver);
  filter.alpha.current = map(
    filter.alpha.current,
    -1,
    1,
    filter.alpha.min,
    filter.alpha.max
  );
}

// animation of the text going left to right
function promptAnimation() {
  // first prompt animation
  prompt1.x1 -= prompt1.speed;
  if (prompt1.x1 < -2000) {
    prompt1.x1 = width
  };
  // duplicate of the first prompt
  prompt1.x2 -= prompt1.speed;
  if (prompt1.x2 < -2000) {
    prompt1.x2 = width
  };
  // second prompt animation
  prompt2.x1 -= prompt2.speed;
  if (prompt2.x1 < -2500) {
    prompt2.x1 = width
  };
  // duplicate of the second prompt
  prompt2.x2 -= prompt2.speed;
  if (prompt2.x2 < -2500) {
    prompt2.x2 = width
  };
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