/**
Incapacité - Prototype
Maxime Perreault

Surrealist mixed media visual adventure where the user input has unexpected effects.

1- mixing the media, layering:
    - background image X
    - 3d animation X
    - ascii overlay X
    - html + css document format X
    - filter / vfx overlay X
    - jquery forms/buttons/dialog X

2- unexpected interaction effect:
    - keypress 1 : key has an effect (raondomized every time the correct key is pressed)

    - dialog box 1 : What do you think about travelling closer to them? -> (12 different options) -> same (effect) -> OK good luck with that.
    - dialog box 2 : Do you want to help them? -> YES/NO -> (effect) -> You cannot reach them from here.
    - dialog box 3 : Is there anything you want to accomplish? -> I want to/ I need to/ I have to/ I -> (effect)
    - dialog box 4 : Why are you abstaining from contact? (answer) -> (effect)

    - selectmenu 1 : Background Shapes/Color/Blurryness/Color 1/Background Effect -> minor change in other items
*/

"use strict";

// define the framerate of the program
const constantFrameRate = 24;

// The object that will be responsible for generating ASCII art graphics
let asciiArt = {
  obj: undefined,
  array: undefined,
  width: 120,
  height: 60,
  pixelDensity: 1,
  posterizeValue: 2,
};

// object containing the png sequence of for the 3d animation and its parameters
let pngSequence = {
  sequence: [],
  alpha: 100,
  darkestAlpha: 0,
  lightestAlpha: 150,
  alphaAnim: {
    t: 0,
    wave: undefined,
    speed: 0.3,
  },

}

// buffer for processed graphics in the form of an object derived from the p5.Graphics class
let gfx;
// "circular" time helper, used for controlling of the cyclic image display
let cyclicT = 0;

// define the parameters for the dialog boxes
let dialogParameters = {
  number: 5,
  delay: 5000,
  cycle: 0,
  autoOpen: false,
  showAnim: {
    // effect: "blind",
    duration: 3500
  },
  hideAnim: {
    effect: "explode",
    duration: 200
  },
};
// store the different dialog objects here
let dialogs = [];

// store the background cloud image here
let backgroundCloud = undefined;


/*
load the png sequence
load the other images
*/
function preload() {
  // load the 3d animation png sequence
  load3dAnimation();

  // load the other images
  loadImages();
}


// load the 3d animation png sequence
function load3dAnimation() {
  for (let i = 1; i < 79; i++) {
    // add a padding as a prefix for the filename
    let filename = `${i}`.padStart(4, `0`);
    pngSequence.sequence[i - 1] = loadImage(`assets/images/animationframes/frames from 3d${filename}.png`);
  }
}

// load the other images
function loadImages() {
  // load the backgorund cloud image
  backgroundCloud = loadImage(`assets/images/clouds.png`);
}


/*
create the canvas
setup the ascii converter graphic handler
*/
function setup() {
  // create the canvas and position it in the #p5-canvas div
  let canvas = createCanvas(640, 640);
  canvas.parent(`#p5-canvas`);

  /* create the ascii object (not possible to put this in a seperated function) */
  // setup for the ascii converter graphic handler
  gfx = createGraphics(asciiArt.width, asciiArt.height);
  gfx.pixelDensity(asciiArt.pixelDensity);
  // create an object derived from the AsciiArt pseudo-class from the p5.asciiart library
  asciiArt.obj = new AsciiArt(this);

  // setup for the dialog boxes
  dialogSetup();

  // set a constant framerate
  frameRate(constantFrameRate);
}


// setup for the dialog boxes
function dialogSetup() {
  // create the dialogs
  for (let i = 0; i < dialogParameters.number; i++) {
    createDialog(i);
  };

  // initialize the loop opening them
  setInterval(dialogLoop, dialogParameters.delay);
}

// create the dialog boxes
function createDialog(dialogNumber) {
  let currentDialog = $(`#dialog-${dialogNumber}`).dialog({
    autoOpen: dialogParameters.autoOpen,
    show: dialogParameters.showAnim,
    hide: dialogParameters.hideAnim,
  });

  // add the current dialog to the dialogs array
  dialogs.push(currentDialog)
}

// loop opening the dialog boxes
function dialogLoop() {
  // select the next dialog (starts at 0)
  let currentDialog = dialogs[dialogParameters.cycle];



  // open the dialog
  currentDialog.dialog("open");

  // set a semi random position
  currentDialog.parent().offset({
    top: Math.random() * ($(window).height() - currentDialog.parent().height()),
    left: Math.random() * ($(window).width() - currentDialog.parent().width())
  });

  // cycle to the next dialog
  dialogParameters.cycle = (dialogParameters.cycle + 1) % dialogs.length;
}


/*
draw the background
draw the ascii converted images
draw the 3d animation
*/
function draw() {
  // draw the background
  drawBackground();

  // define the cyclic t equation for the images to loop
  cyclicT = (cyclicT + 1) % pngSequence.sequence.length;

  // prepare the image for conversion
  gfx.image(pngSequence.sequence[floor(cyclicT)], 0, 10, gfx.width, gfx.height);
  // posterize effect
  gfx.filter(POSTERIZE, asciiArt.posterizeValue);
  // Here the processed image is converted to the ASCII art
  asciiArt.array = asciiArt.obj.convert(gfx);

  /*
  // change the ascii table characters
  let code = 120;
  let targetWeight = 10000;
  changeTable(code, targetWeight);
  */

  // display the ASCII art on the screen
  asciiArt.obj.typeArray2d(asciiArt.array, this);

  // draw the 3d animation frames
  draw3dAnimation();
}


// draw the background elements
function drawBackground() {
  // set the background to black
  background(0);

  // draw the background cloud
  image(backgroundCloud, -0, 150);
}

// draw the 3d animation frames
function draw3dAnimation() {
  // display the source image
  tint(255, pngSequence.alpha);
  translate(75, -100);
  image(pngSequence.sequence[floor(cyclicT)], 0, 0, width, height);
  noTint();

  // apply an alpha animation making the original images flash
  alphaAnimation();
}


// change the characters used to draw the as
function changeTable(code, targetWeight) {
  // here we can change the characters of the ascii table
  for (let i = 0; i < asciiArt.obj.__weightTable.length; i++) {
    if (asciiArt.obj.__weightTable[i].weight > targetWeight) {
      asciiArt.obj.__weightTable[i].code = code;
    };
  };
}

// makes the 3d animation blink according to a sin wave
function alphaAnimation() {
  pngSequence.alphaAnim.wave = sin(pngSequence.alphaAnim.t);
  pngSequence.alphaAnim.wave = map(pngSequence.alphaAnim.wave, -1, 1, pngSequence.darkestAlpha, pngSequence.lightestAlpha);
  pngSequence.alphaAnim.t += pngSequence.alphaAnim.speed;
  pngSequence.alpha = pngSequence.alphaAnim.wave;
}
