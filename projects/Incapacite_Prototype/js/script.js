"use strict";

/*
  The object that will be responsible for generating ASCII art graphics. The
  object will be derived from the AsciiArt pseudo-class from the p5.asciiart
  library, so remember to add the p5.asciiart library to the project in the
  appropriate html file.
*/
let myAsciiArt;

/*
  The size of generated ASCII graphics expressed in characters and lines.
*/
let asciiart_width = 120;
let asciiart_height = 60;

/*
  This table will store several example images that will be converted to the
  ASCII art form.
*/
let images = [];

let realImage = {
  alpha: 100,
  alphaWave: undefined,
  t : 0,
}

/*
  Buffer for processed graphics, simplifying some operations. This will be an
  object derived from the p5.Graphics class
*/
let gfx;

/*
  This letiable will store a two-dimensional array - "image" in the form of
  ASCII codes.
*/
let ascii_arr;

/*
  A helper letiable to store current "circular" time, useful in controlling of
  the cyclic image display.
*/
let cyclic_t = 0;

/*
  Let's load the example images first.
*/
function preload() {
  for (let i = 1; i < 50; i++) {
    let filename = `${i}`.padStart(4, `0`);
    images[i - 1] = loadImage(`assets/images/${filename}.png`);
  }
}

function setup() {
  createCanvas(640, 640); // we need some space...
  /*
    In this particular case the gfx helper should have dimensions the same as
    the target graphic.
  */
  gfx = createGraphics(asciiart_width, asciiart_height);
  gfx.pixelDensity(1);
  /*
    Here we create an object derived from the AsciiArt pseudo-class from the
    p5.asciiart library.
      new AsciiArt(_sketch);
      new AsciiArt(_sketch, _fontName);
      new AsciiArt(_sketch, _fontName, _fontSize);
      new AsciiArt(_sketch, _fontName, _fontSize, _textStyle);
  */
  myAsciiArt = new AsciiArt(this);
  /*
    After initializing the object, look at (in the console) the listing of the
    array containing the glyphs sorted according to the amount of space
    occupied. This table is the basis for the procedure that converts
    individual image pixels into glyphs.
  */
  myAsciiArt.printWeightTable();
  // for (let i =0; i<myAsciiArt.__weightTable.length; i++){
  //   myAsciiArt.__weightTable[i].weight = 100000;
  // }
  /*
    Here we set the font family, size and style. By default ASCII Art library
    is using 'monospace' font, so we want to apply the same setting to our
    sketch.
  */
  textAlign(CENTER, CENTER);
  textFont('monospace', 12);
  textStyle(NORMAL);
  noStroke();
  fill(255);
  /*
    Finally we set the framerate.
  */
  frameRate(30);
}

function draw() {
  background(0);

  cyclic_t = (cyclic_t + 1) % images.length;

  /*
    Let's prepare the image for conversion. Although the object derived from
    the AsciiArt pseudo-class has it's own mechanism of changing the size of
    the image, we will use the external one. Thanks to this we will be able -
    before transferring the image for conversion - to perform the posterize
    effect on it, which will make the final effect better.
  */
  gfx.image(images[floor(cyclic_t)], 0, 0, gfx.width, gfx.height);
  /*
    It is worth experimenting with the value of the parameter defining the
    level of posterization. Depending on the characteristics of the image,
    different values may have the best effect. And sometimes it is worth not
    to apply the effect of posterization on the image.
  */
  gfx.filter(POSTERIZE, 3);
  /*
    Here the processed image is converted to the ASCII art. The convert()
    function in this case is used with just one parameter (image we want to
    convert), so the resultant ASCII graphics will have the same resolution
    as the image. If necessary (especially if the resolution of the converted
    image is relatively high), it is possible to use the converter function
    in the version with three parameters: then the second and third
    parameters will be respectively the width and height of the generated
    glyph table. The convert() function returns a two-dimensional array of
    characters containing the representation of the converted graphics in the
    form of the ASCII art. If the conversion fails, the function returns
    null
  */
  ascii_arr = myAsciiArt.convert(gfx);

  // invert the brightness
  myAsciiArt.invertBrightnessFlag = false;
  // myAsciiArt.invertBrightnessFlag = true;
  /*
    Now it's time to show ASCII art on the screen. First, we set drawing
    parametrs. Next, we call the function typeArray2d() embedded in the
    ASCII Art library, that writes the contents of a two-dimensional array
    containing (implicitly) text characters (chars) on the screen. In this
    case, we call a function with 2 parameters: the first is the table
    whose contents we want to print, and the second is the destination (an
    object with "canvas" property). If you use the function with two
    parameters (as we do in this example), it will assume that you need to
    fill the entire surface of the target canvass with a drawing. However,
    the function can be called in 3 letiants:
      [AsciiArt instance].typeArray2d(_arr2d, _dst);
      [AsciiArt instance].typeArray2d(_arr2d, _dst, _x, _y);
      [AsciiArt instance].typeArray2d(_arr2d, _dst, _x, _y, _w, _h);
    The parameters are as follows:
      _arr2d - 2-dimentional array containing glyphs (chars)
      _dst - destination (typically the sketch itself)
      _x, _y - coordinates of the upper left corner
      _w, _h - width and height
    It is relatively easy to write your own function that formats the contents
    of an array to ASCII graphics. At the end of this example, I glue the
    function code from a non-minimized version of the library - it can be
    used as a base for your own experiments.
  */
  myAsciiArt.typeArray2d(ascii_arr, this);

  alphaAnimation();

  /*
    Finally, let's display the source image, too.
  */
  tint(255, realImage.alpha);
  image(images[floor(cyclic_t)], 0, 0, width, height);
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
