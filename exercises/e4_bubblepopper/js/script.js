/**
Bubble Popper
Maxime Perreault

    fun plan but I don't have time to make it cool woops
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

new plan:
1- add states + loading screens
2- create a bubble class so its easier to create more at the same time
3- add different stuff that bubble can do?
4- add counter of bubbles popped
*/

"use strict";

// refer to the user's webcam
let video = undefined;

// refer to the handpose model
let handpose = undefined;

// store the current set of predictions
let predictions = [];

// refer to the bubble
let bubble = undefined;

// refer to the different states
let states = `intro`; // possible states : intro, game, end

/**
create the canvas
access the user's webcam
*/
function setup() {
  // create a canvas
  createCanvas(640, 480);

  // access the user's webcam
  video = createCapture(VIDEO);
  video.hide();

  // load the handpose model
  handpose = ml5.handpose(video, { flipHorizontal: true }, function () {
    console.log(`Model loaded`);
  });

  // listen for predictions
  handpose.on(`predict`, function (results) {
    console.log(results);
    predictions = results;
  });

  // create the bubble
  bubble = {
    x: random(0, width),
    y: height,
    size: 100,
    vx: 0,
    vy: -1.8,
  };
}

/**
draw the background
draw the pin from the handpose data
draw the bubble
*/
function draw() {
  // draw the background
  background(10, 10, 10);

  // check if there's a hand recognized
  if (predictions.length > 0) {
    // get the hand data
    let hand = predictions[0];
    // get the index finger data
    let index = hand.annotations.indexFinger;
    // get the tip of the index data
    let tip = index[3];
    // get the x and y value of the tip
    let tipX = tip[0];
    let tipY = tip[1];
    // get the bas of the index data
    let base = index[0];
    // get the x and y value of the base
    let baseX = base[0];
    let baseY = base[1];

    // draw a pin
    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();
    // draw the base of the pin
    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(baseX, baseY, 20);
    pop();

    // check if the bubble should pop
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if (d < bubble.size / 2) {
      // reassign position if the bubble is popped
      bubble.x = random(0, width);
      bubble.y = height;
    }
  }

  // assign basic movement to the bubble
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  // reassign position if the bubble gets out of the canvas
  if (bubble.y < 0) {
    bubble.x = random(0, width);
    bubble.y = height;
  }

  // draw the bubble
  push();
  fill(0, 100, 200);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();
}
