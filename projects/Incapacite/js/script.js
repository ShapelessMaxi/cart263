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
    - keypress 1 : key has an effect (randomized every time the correct key is pressed)
    - dialog box 1 : What do you think about travelling closer to them? -> (12 different options) -> same (effect) -> OK good luck with that.
    - dialog box 2 : Do you want to help them? -> YES/NO -> (effect) -> You cannot reach them from here.
    - dialog box 3 : Is there anything you want to accomplish? -> I want to/ I need to/ I have to/ I -> (effect)
    - dialog box 4 : Why are you abstaining from contact? (answer) -> (effect)
    - selectmenu 1 : Background Shapes/Color/Blurryness/Color 1/Background Effect -> minor change in other items
*/

"use strict";

/* global vairables and objects */

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
    speed: 0.7,
  },

}

// buffer for processed graphics in the form of an object derived from the p5.Graphics class
let gfx;
// "circular" time helper, used for controlling of the cyclic image display
let cyclicT = 0;

// define the parameters for the dialog boxes
let dialogParameters = {
  delay: 5000,
  cycle: 1,
  autoOpen: false,
  showAnim: {
    effect: "blind",
    duration: 3500
  },
  hideAnim: {
    effect: "explode",
    duration: 200
  },
  title: `hmmmmmmm`,
};
// store all the dialog data here
let dialogData = {
  dialog1: {
    question: `What do you think about travelling closer to them?`,
    answer1: "Ok good luck with that.",
    answer2: "...",
    button1: {
      text: `yes`,
      click: () => {
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog1, 2000, true);
      },
    },
    button2: {
      text: `no`,
      click: () => {
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog1, 2000, false);
      },
    },
    button3: {
      text: `okay`,
      click: () => {
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog1, 2000, true);
      },
    },
    button4: {
      text: `never`,
      click: () => {
        // close the dialog
        $(`#dialog`).dialog("close");
        // invert the ascii color
        invertAscii();
        // open the anser dialog
        setTimeout(answerDialog1, 2000, false);
      },
    },
    button5: {
      text: `for sure`,
      click: () => {
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog1, 2000, true);
      },
    },
    button6: {
      text: `maybe`,
      click: () => {
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog1, 2000, false);
      },
    },
    button7: {
      text: `non`,
      click: () => {
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog1, 2000, false);
      },
    },
    button8: {
      text: `oui`,
      click: () => {
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog1, 2000, true);
      },
    },
    button9: {
      text: `I guess`,
      click: () => {
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog1, 2000, true);
      },
    },
  },
  dialog2: {
    question: `Do you want to help them?`,
  },
  dialog3: {
    question: `I there anything you want to accomplish?`,
  },
  dialog4: {
    question: `Why are you abstaining from contact?`,
  },
  dialog5: {
    question: `Oh hey what's up with that?`,
  },
}

// store the current random key here
let randomKey = undefined;
// store a-z keycodes here
let keyCodes = [
  65,
  66,
  67,
  68,
  69,
  70,
  71,
  72,
  73,
  74,
  75,
  76,
  77,
  78,
  79,
  80,
  81,
  82,
  83,
  84,
  85,
  86,
  87,
  88,
  89,
  90,
];

// store the background cloud image here
let backgroundCloud = undefined;


/* preload and load methods */

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
  for (let i = 1; i < 82; i++) {
    // add a padding as a prefix for the filename
    let filename = `${i}`.padStart(3, `0`);
    pngSequence.sequence[i - 1] = loadImage(`assets/images/animationframes/${filename}.png`);
  }
}

// load the other images
function loadImages() {
  // load the backgorund cloud image
  backgroundCloud = loadImage(`assets/images/clouds.png`);
}


/* setup and setup/create methods */

/*
create the canvas
setup the ascii converter graphic handler
*/
function setup() {
  // create the canvas and position it in the #p5-canvas div
  let canvas = createCanvas(400, 640);
  canvas.parent(`#p5-canvas`);

  /* create the ascii object (not possible to put this in a seperated function) */
  // setup for the ascii converter graphic handler
  gfx = createGraphics(asciiArt.width, asciiArt.height);
  gfx.pixelDensity(asciiArt.pixelDensity);
  // create an object derived from the AsciiArt pseudo-class from the p5.asciiart library
  asciiArt.obj = new AsciiArt(this);

  // setup for the dialog boxes
  dialogSetup();

  // get the first random key
  getRandomkey();

  // set a constant framerate
  frameRate(constantFrameRate);
}


// setup for the dialog boxes
function dialogSetup() {
  // create the dialog box
  createDialog(dialogParameters.cycle);
}

// open the dialog
function openDialog() {
  // modify the dialog data
  modifyDialog(dialogParameters.cycle);

  // open the dialog
  $(`#dialog`).dialog("open");

  // kee track of whoch dialog we have opened
  dialogParameters.cycle++;
}

// create the dialog boxes
function createDialog(dialogNumber) {
  $(`#dialog`).dialog({
    autoOpen: dialogParameters.autoOpen,
    show: dialogParameters.showAnim,
    hide: dialogParameters.hideAnim,
    position: {
      my: `center`,
      at: `left+${Math.random() * $(window).width()} top+${Math.random() * $(window).height()}`,
      of: window,
    },
    buttons: [],
    title: dialogParameters.title,
  }, );

  // add the buttons
  modifyDialog(dialogNumber);

  // open the first dialog
  openDialog();
}

// modify the dialog with the correct dialog data
function modifyDialog(dialogNumber) {
  // switch between dialog number, given as a parameter
  let currentDialog = null;
  switch (dialogNumber) {
    case 1:
      currentDialog = dialogData.dialog1;
      break;
    case 2:
      currentDialog = dialogData.dialog2;
      break;
    case 3:
      currentDialog = dialogData.dialog3;
      break;
    case 4:
      currentDialog = dialogData.dialog4;
      break;
    case 5:
      currentDialog = dialogData.dialog5;
      break;
  };

  // set the question of the dialog
  $(`#dialog-question`).text(currentDialog.question);

  // store the button objects here
  let buttonObjects = [];
  // iterate through the properties of the dialog
  for (const property in currentDialog) {
    if (property.startsWith(`button`)) {
      // get the button object with the property name
      let currentButton = currentDialog[property];
      buttonObjects.push(currentButton);
    };
  };

  // add the buttons to the dialog
  $(`#dialog`).dialog({
    buttons: buttonObjects,
  });
}

/* draw and draw methods */

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
  push();
  image(backgroundCloud, 0, 150);
  pop();
}

// draw the 3d animation frames
function draw3dAnimation() {
  // display the source image
  tint(255, pngSequence.alpha);
  translate(75, 0);
  image(pngSequence.sequence[floor(cyclicT)], 0, 0, width, height);
  noTint();

  // apply an alpha animation making the original images flash
  alphaAnimation();
}


/* effects methods */

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

// get a random key to use as an easter egg
function getRandomkey() {
  randomKey = random(keyCodes);

  // tell me what the key is!~
  console.log(`the random key is: ${randomKey}...`);
  console.log(`google it.`);
}

// change the ascii table characters
function modifyAsciiTable() {
  let code = random(1, 126);
  let targetWeight = 10000;
  changeTable(code, targetWeight);
}

// invert the brightness of the ascii art
function invertAscii() {
  if (asciiArt.obj.invertBrightnessFlag === true) {
    asciiArt.obj.invertBrightnessFlag = false;
  } else {
    asciiArt.obj.invertBrightnessFlag = true;
  }
}

// change the blend overlay properties (add randomness in the futur)
function modifyBlendOverlay() {
  $(`.blend`).css({
    "background-color": "blue"
  });
  $(`.blend`).css({
    "mix-blend-mode": "screen"
  });
}


/* answer methods related to dialogs*/

// dialog1 answer after closing it
function answerDialog1(positiveAnswer) {
  // change what the dialog says
  if (positiveAnswer) {
    $(`#dialog-question`).text(dialogData.dialog1.answer1);
  } else {
    $(`#dialog-question`).text(dialogData.dialog1.answer2);
  };

  // remove the buttons
  $(`#dialog`).dialog({
    buttons: [],
  });

  // add the close event listener
  $("#dialog").on("dialogclose", function(event, ui) {
    // invert the color of the ascii image reference
    invertAscii();
    // set a timer to open the next dialog
    setTimeout(() => {
      modifyDialog(dialogParameters.cycle); // open the next dialog
      openDialog();
    }, 5000)
  });

  // open the dialog
  $(`#dialog`).dialog("open");
}


/* p5 native methods */

// listens to the user pressing keys
function keyPressed() {
  if (keyCode === randomKey) {
    // close all dialogs (maybe find another thing to do in the futur, like close some, open others, or change the buttons options?)
    $(`#dialog`).dialog("close");

    // get a new random key
    getRandomkey();
  };
}
