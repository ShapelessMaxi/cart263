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
    -
*/

"use strict";

// The object that will be responsible for generating ASCII art graphics
let myAsciiArt;
// The size of generated ASCII graphics expressed in characters and lines.
let asciiart_width = 120;
let asciiart_height = 60;

// store the png sequence
let images = [];
// definition of variable used to display the original images
let realImage = {
  alpha: 100,
  alphaWave: undefined,
  t: 0,
}

// Buffer for processed graphics, simplifying some operations. This will be an object derived from the p5.Graphics class
let gfx;
// This letiable will store a two-dimensional array - "image" in the form of ASCII codes.
let ascii_arr;
// A helper letiable to store current "circular" time, useful in controlling of the cyclic image display.
let cyclicT = 0;

// store the background image here
let backgroundCloud = undefined;

/*
load the png sequence
*/
function preload() {
  // load the 3d animation png sequence
  for (let i = 1; i < 79; i++) {
    // add a padding as a prefix for the filename
    let filename = `${i}`.padStart(4, `0`);
    images[i - 1] = loadImage(`assets/images/animationframes/frames from 3d${filename}.png`);
  }

  // load the background image
  backgroundCloud = loadImage(`assets/images/clouds.png`);
}

/*
create the canvas
setup the ascii converter graphic handler
*/
function setup() {
  // create the canvas
  let canvas = createCanvas(640, 640);
  canvas.parent(`#p5-canvas`);

  // setup for the ascii converter graphic handler
  gfx = createGraphics(asciiart_width, asciiart_height);
  gfx.pixelDensity(1);
  // create an object derived from the AsciiArt pseudo-class from the p5.asciiart library.
  myAsciiArt = new AsciiArt(this);
  // This table is the basis for the procedure that converts individual image pixels into glyphs.
  myAsciiArt.printWeightTable();
  // here we can change the characters of the ascii table (120 = X)
  // for (let i = 0; i < myAsciiArt.__weightTable.length; i++) {
  //   myAsciiArt.__weightTable[i].code = 120;
  // }

  // set the font family, size and style for the ascii display
  textAlign(CENTER, CENTER);
  textFont('monospace', 12);
  textStyle(NORMAL);
  noStroke();
  fill(255);

  // create the dialogs
  dialogSetup();

  // set a constant framerate
  frameRate(30);
}

function dialogSetup(){
  $(".dialog").dialog();
}
/*
draw the background
draw the ascii converted images
draw the original images
*/
function draw() {
  // draw the background
  drawBackground();

  // define the cyclic t equation for the images to loop
  cyclicT = (cyclicT + 1) % images.length;

  // Let's prepare the image for conversion
  gfx.image(images[floor(cyclicT)], 0, 10, gfx.width, gfx.height);
  // posterize effect
  gfx.filter(POSTERIZE, 4);
  // Here the processed image is converted to the ASCII art
  ascii_arr = myAsciiArt.convert(gfx);

  // invert the brightness
  // myAsciiArt.invertBrightnessFlag = true;

  // display the ASCII art on the screen
  myAsciiArt.typeArray2d(ascii_arr, this);

  // draw the 3d animation frames
  draw3d();
}

// draw the background elements
function drawBackground(){
  // set the background to black
  background(0);
  // draw the background cloud
  image(backgroundCloud, -0, 150);
}

// draw the 3d animation frames
function draw3d(){
  // display the source image
  tint(255, realImage.alpha);
  translate(75, -100);
  image(images[floor(cyclicT)], 0, 0, width, height);
  noTint();

  // apply an alpha animation making the original images flash
  alphaAnimation();
}

// makes the highlighted bodypart blink slowly
function alphaAnimation() {
  let animationSpeed = 0.3;
  let darkestAlpha = 0;
  let lightestAlpha = 150;

  realImage.alphaWave = sin(realImage.t);
  realImage.alphaWave = map(realImage.alphaWave, -1, 1, darkestAlpha, lightestAlpha);
  realImage.t += animationSpeed;
  realImage.alpha = realImage.alphaWave;
}
