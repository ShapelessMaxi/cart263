/**
Incapacité - Prototype
Maxime Perreault

Surrealist mixed media adventure where the user input has unexpected effects.

1- mixing the media, layering:
    - background image
    - 3d animation
    - ascii overlay
    - html + css document format (?)
    - filter / color correction / vfx overlay (?)
    - jquery forms/buttons/dialog

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

/*
load the png sequence
*/
function preload() {
  for (let i = 1; i < 200; i++) {
    // add a padding as a prefix for the filename
    let filename = `${i}`.padStart(4, `0`);
    images[i - 1] = loadImage(`assets/images/${filename}.png`);
  }
}

/*
create the canvas
setup the ascii converter graphic handler
*/
function setup() {
  // create the canvas
  createCanvas(640, 640);

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

  // set a constant framerate
  frameRate(30);
}

/*
draw the background
draw the ascii converted images
draw the original images
*/
function draw() {
  // set te background to black
  background(0);

  // set the font family, size and style for the ascii display
  push();
  textAlign(CENTER, CENTER);
  textFont('monospace', 12);
  textStyle(NORMAL);
  noStroke();
  fill(255);

  // define the cyclic t equation for the images to loop
  cyclicT = (cyclicT + 1) % images.length;

  // Let's prepare the image for conversion
  gfx.image(images[floor(cyclicT)], 0, 0, gfx.width, gfx.height);
  // posterize effect
  gfx.filter(POSTERIZE, 3);
  // Here the processed image is converted to the ASCII art
  ascii_arr = myAsciiArt.convert(gfx);

  // invert the brightness
  myAsciiArt.invertBrightnessFlag = false;
  // myAsciiArt.invertBrightnessFlag = true;

  // Now it's time to show ASCII art on the screen
  myAsciiArt.typeArray2d(ascii_arr, this);
  pop();

  // apply an alpha animation making the original images flash
  alphaAnimation();

  // display the source image
  tint(255, realImage.alpha);
  translate(200, 200);
  image(images[floor(cyclicT)], 0, 0, width, height);
  noTint();
}

// makes the highlighted bodypart blink slowly
function alphaAnimation() {
  let animationSpeed = 5;
  let darkestAlpha = 0;
  let lightestAlpha = 150;

  realImage.alphaWave = sin(realImage.t);
  realImage.alphaWave = map(realImage.alphaWave, -1, 1, darkestAlpha, lightestAlpha);
  realImage.t += animationSpeed;
  realImage.alpha = realImage.alphaWave;
}
