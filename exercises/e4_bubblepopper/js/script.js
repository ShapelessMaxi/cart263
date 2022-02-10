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
- make it look better :)))))

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
let state = `intro`; // possible states : intro, game, end

// refer to the cursor image
let cursor = undefined;

// refer to the start button
let startButton = {
  x: undefined,
  y: undefined,
  width: 200,
  height: 50,
  corner: 10,
  text: `start`,
  color1: { r: 200, g: 200, b: 100 },
  color2: { r: 245, g: 245, b: 220 },
  sliced: false,
};

/**
create the canvas
access the user's webcam
load the cursor image
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

  // load the cursor image
  cursor = loadImage(`assets/images/sword.png`);
}

/**
checks which state need to be called
*/
function draw() {
  // takes care of choosing the state
  if (state === `intro`) {
    intro();
  } else if (state === `game`) {
    game();
  } else if (state === `end`) {
    end();
  }
}

// predict the position of the index finger
// call drawCursor()
// call sliceButton()
function handPosePredictions() {
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

    // draw the cursor
    drawCursor(baseX, baseY, tipX, tipY);

    // store the tip of the finger here
    sliceButton(tipX, tipY);
  }
}

// draw the cursor according to the user's hand's postion
function drawCursor(x1, y1, x2, y2) {
  push();
  imageMode(CORNER);
  image(cursor, x1, y1, x2, y2);
  pop();
}

// takes care of all the intro state related interactions
function intro() {
  // draw the background
  background(207, 95, 143);

  // takes care of recognizing the user's index
  handPosePredictions();

  // draw a start button to slice
  drawStartButton();

  // draw a sword
  drawCursor();
}

// draw the start button
function drawStartButton() {
  // assign the position of the button
  startButton.x = width / 2;
  startButton.y = height / 1.3;

  // draw a rectangle
  push();
  rectMode(CENTER);
  fill(startButton.color1.r, startButton.color1.g, startButton.color1.b);
  strokeWeight(5);
  stroke(startButton.color2.r, startButton.color2.g, startButton.color2.b);
  rect(
    startButton.x,
    startButton.y,
    startButton.width,
    startButton.height,
    startButton.corner
  );
  pop();
  // draw the text
  push();
  textAlign(CENTER, CENTER);
  fill(startButton.color2.r, startButton.color2.g, startButton.color2.b);
  textSize(24);
  textStyle(BOLD);
  text(startButton.text, startButton.x, startButton.y);
  pop();

  // draw the slice thingy
  if (startButton.sliced) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(207, 95, 143);
    rect(startButton.x, startButton.y, 30, startButton.height + 10);
    pop();
  }
}

// takes care of slicing the button
function sliceButton(tipX, tipY) {
  // check if the distance of the tip is close enough too slice the button
  let d = dist(tipX, tipY, startButton.x, startButton.y);
  if (d < 100) {
    // keeps track of the button being sliced
    startButton.sliced = true;
    // change the state of the game after 1 second
    setTimeout(function () {
      state = `game`;
    }, 3000);
  }
}

// takes care of all the game state related interactions
function game() {
  // draw the background
  background(118, 142, 181);

  // takes care of recognizing the user's index
  handPosePredictions();

  // draw the bubbles
  push();
  fill(0, 100, 200);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();

  // // assign basic movement to the bubble
  // bubble.x += bubble.vx;
  // bubble.y += bubble.vy;
  //
  // // reassign position if the bubble gets out of the canvas
  // if (bubble.y < 0) {
  //   bubble.x = random(0, width);
  //   bubble.y = height;
  // }

  // check if the bubble should pop
  // let d = dist(tipX, tipY, bubble.x, bubble.y);
  // if (d < bubble.size / 2) {
  //   // reassign position if the bubble is popped
  //   bubble.x = random(0, width);
  //   bubble.y = height;
  // }
}

// takes care of all the end state related interactions
function end() {
  // draw the background
  background(24, 15, 36);
}
