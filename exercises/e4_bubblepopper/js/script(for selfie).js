/**
Bubble Popper
Maxime Perreault

pop bubbles with finger :o
(maybe not 'pop', but like pet ur forehead?, difference between a slap and a soft touch?)
- 1st state : setup/intro
- ask the user to 'strike a pose' and to say 'aaaah'
    - save an img of the user
    (or maybe we should detect the 'person' with ml5.js ObjectDetector and relocate it later on?)
    - save a sound file of the user
- 2nd state : game
- use the img of the user (or the detection of the users face?) as the head of a stick figure
- use the sound of the user when the head is touched
    - process in a few different ways
- add loading screen
*/

"use strict";

// refer to the user's webcam
let video = undefined;

// refer to the selfie of the user
let selfie = undefined;
let selfieTaken = false;

/**
create the canvas
access the user's webcam
*/
function setup() {
  // create a canvas
  createCanvas(640, 480);

  // access the user's webcam
  video = createCapture(VIDEO);
  video.size(100, 100);
  video.hide();

  //
}

/*
draw the background
draw the pin from the handpose data
draw the bubble
*/
function draw() {
  // draw the background
  background(10, 10, 10);

  // image(video, 0, 0);
  // draw the user's selfie
  if (selfieTaken) {
    image(selfie, 0, 0);
  }
}

function mousePressed() {
  // check if a selfie has been taken
  if (selfie !== undefined) {
    // ask if user want to retake the selfie
    let answer = prompt(`retake a selfie (type 'yes or 'no')`);
    if (answer === `yes`) {
      // take a selfie
      selfie = createGraphics(width, height);
      selfie.image(video, 0, 0);
      selfieTaken = true;
    }
  } else {
    // take a selfie
    selfie = createGraphics(width, height);
    selfieTaken = true;
  }
}
