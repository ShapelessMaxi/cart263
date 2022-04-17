/**
Incapacité - Prototype
Maxime Perreault

Surrealist mixed media visual adventure where the user input has unexpected effects.

1- mixing the media, layering:
    - background texture substance
    - jquery forms/buttons/dialog
    - weird images 2nd column

2- unexpected interaction effect:
    - keypress 1 : key has an effect (revisit the effect it has)
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
    answer2: "Alright.",
    button1: {
      text: `yes`,
      click: () => {
        // apply some effects
        effectsDialog1();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog1, true);
      },
    },
    button2: {
      text: `no`,
      click: () => {
        // apply some effects
        effectsDialog1();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog, 2000, dialogData.dialog1, false);
      },
    },
    button3: {
      text: `okay`,
      click: () => {
        // apply some effects
        effectsDialog1();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog, 2000, dialogData.dialog1, true);
      },
    },
    button4: {
      text: `never`,
      click: () => {
        // apply some effects
        effectsDialog1();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog, 2000, dialogData.dialog1, false);
      },
    },
    button5: {
      text: `for sure`,
      click: () => {
        // apply some effects
        effectsDialog1();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog, 2000, dialogData.dialog1, true);
      },
    },
    button6: {
      text: `maybe`,
      click: () => {
        // apply some effects
        effectsDialog1();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog, 2000, dialogData.dialog1, false);
      },
    },
    button7: {
      text: `non`,
      click: () => {
        // apply some effects
        effectsDialog1();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog, 2000, dialogData.dialog1, false);
      },
    },
    button8: {
      text: `oui`,
      click: () => {
        // apply some effects
        effectsDialog1();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog, 2000, dialogData.dialog1, true);
      },
    },
    button9: {
      text: `I guess`,
      click: () => {
        // apply some effects
        effectsDialog1();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog, 2000, dialogData.dialog1, true);
      },
    },
  },
  dialog2: {
    question: `Do you want to help them?`,
    answer1: "You cannot reach them from here.",
    answer2: "Not that you could reach them anyway.",
    button1: {
      text: `yes`,
      click: () => {
        // apply some effects
        effectsDialog2();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog2, true);
      },
    },
    button2: {
      text: `no`,
      click: () => {
        // apply some effects
        effectsDialog2();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog2, false);
      },
    },
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

// keep track of the amount of interactions (clicks and keypresses)
let interactions = {
  count: 0,
  levels: {
    a: 10,
    b: 16,
    c: 22,
    d: 28,
    e: 34,
    f: 40,
    g: 46,
    h: 52,
    i: 58,
    j: 64,
    k: 70,
    l: 76,
    m: 82,
    n: 88,
    o: 94,
  },
}

// store the sounds here
let backgroundSound = {
  amp: 0.2,
  bpm80: undefined,
  bpm90: undefined,
  bpm100: undefined,
  bpm110: undefined,
  bpm120: undefined,
  bpm130: undefined,
  bpm140: undefined,
  bpm150: undefined,
  bpm160: undefined,
}
let bgSounds = [];
// store the current background sound here
let currentBackgroundSound = undefined;

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

  // load the sound files
  loadSounds();
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

// load the sound files
function loadSounds() {
  // load the background sound files
  backgroundSound.bpm80 = loadSound(`assets/sounds/background-80.wav`);
  backgroundSound.bpm90 = loadSound(`assets/sounds/background-90.wav`);
  backgroundSound.bpm100 = loadSound(`assets/sounds/background-100.wav`);
  backgroundSound.bpm110 = loadSound(`assets/sounds/background-110.wav`);
  backgroundSound.bpm120 = loadSound(`assets/sounds/background-120.wav`);
  backgroundSound.bpm130 = loadSound(`assets/sounds/background-130.wav`);
  backgroundSound.bpm140 = loadSound(`assets/sounds/background-140.wav`);
  backgroundSound.bpm150 = loadSound(`assets/sounds/background-150.wav`);
  backgroundSound.bpm160 = loadSound(`assets/sounds/background-160.wav`);
  bgSounds.push(
    backgroundSound.bpm80,
    backgroundSound.bpm90,
    backgroundSound.bpm100,
    backgroundSound.bpm110,
    backgroundSound.bpm120,
    backgroundSound.bpm130,
    backgroundSound.bpm140,
    backgroundSound.bpm150,
    backgroundSound.bpm160
  );
}


/* setup and setup/create methods */

/*
create the canvas
setup the ascii converter graphic handler
*/
function setup() {
  // create the canvas and position it in the #p5-canvas div
  let canvas = createCanvas(550, 800);
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

  // play and loop the background music
  playBackgroundMusic(backgroundSound.bpm80);
  // stops the audio (starts on first user click)
  getAudioContext().suspend();
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

// play and loop the background music
function playBackgroundMusic(sound) {
  // stop other background music if it"s playing
  for (let i = 0; i < bgSounds.length; i++) {
    if (checkPlaying(bgSounds[i])) {
      bgSounds[i].stop();
    }
  };

  // play the sound
  if (sound.isLoaded()) {
    sound.amp(backgroundSound.amp);
    sound.loop()
  };
}

// check if a sound is playing, return true or fale
function checkPlaying(sound) {
  if (sound.isPlaying() || sound.isLooping()) {
    return true;
  } else {
    return false;
  };
}

/* draw and draw methods */

/*
draw the background
draw the ascii converted images
draw the 3d animation
*/
function draw() {
  console.log(interactions.count)
  // draw the background
  drawBackground();

  // define the cyclic t equation for the images to loop
  cyclicT = (cyclicT + 1) % pngSequence.sequence.length;

  // prepare the image for conversion
  gfx.image(pngSequence.sequence[floor(cyclicT)], 28, 5, gfx.width, gfx.height);

  // posterize effect
  gfx.filter(POSTERIZE, asciiArt.posterizeValue);

  // Here the processed image is converted to the ASCII art
  asciiArt.array = asciiArt.obj.convert(gfx);

  // display the ASCII art on the screen
  asciiArt.obj.typeArray2d(asciiArt.array, this);

  // draw the 3d animation frames
  draw3dAnimation();

  // draw other images
  drawImages();

  // change the background music and reveal the secret poem according to the levels of the interaction counter
  interactionCounterEffect();
}


// draw the background elements
function drawBackground() {
  // set the background to black
  background(0);
}

// draw other images
function drawImages() {
  // draw the cloud
  push();
  tint(255, 150);
  image(backgroundCloud, 0, 150);
  pop();
}

// draw the 3d animation frames
function draw3dAnimation() {
  // display the source image
  push();
  tint(255, pngSequence.alpha);
  image(pngSequence.sequence[floor(cyclicT)], 0, 0, width, height);
  noTint();
  pop();

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

// change the background music and reveal the secret poem according to the levels of the interaction counter
function interactionCounterEffect() {
  if (interactions.count === interactions.levels.a) {
    $(`#secret-1`).text(` À égale `);
    playBackgroundMusic(backgroundSound.bpm90);
    interactions.count++;
  } else if (interactions.count === interactions.levels.b){
    $(`#secret-1`).text(` À égale mesure, `);
    interactions.count++;
  } else if (interactions.count === interactions.levels.c){
    $(`#secret-1`).text(` À égale mesure, peu importe `);
    playBackgroundMusic(backgroundSound.bpm100);
    interactions.count++;
  } else if (interactions.count === interactions.levels.d){
    $(`#secret-1`).text(` À égale mesure, peu importe à quel point `);
    interactions.count++;
  } else if (interactions.count === interactions.levels.e){
    $(`#secret-1`).text(` À égale mesure, peu importe à quel point tu essaie, `);
    playBackgroundMusic(backgroundSound.bpm110);
    interactions.count++;
  } else if (interactions.count === interactions.levels.f){
    $(`#secret-2`).text(` Tu échoue `);
    interactions.count++;
  } else if (interactions.count === interactions.levels.g){
    $(`#secret-2`).text(` Tu échoue et tu réussi `);
    playBackgroundMusic(backgroundSound.bpm120);
    interactions.count++;
  } else if (interactions.count === interactions.levels.h){
    $(`#secret-3`).text(` C'est ta vie `);
    interactions.count++;
  } else if (interactions.count === interactions.levels.i){
    $(`#secret-3`).text(` C'est ta vie qui se transforme `);
    playBackgroundMusic(backgroundSound.bpm130);
    interactions.count++;
  } else if (interactions.count === interactions.levels.j){
    $(`#secret-3`).text(` C'est ta vie qui se transforme avec la chance `);
    interactions.count++;
  } else if (interactions.count === interactions.levels.k){
    $(`#secret-4`).text(` Et c'est la chance `);
    playBackgroundMusic(backgroundSound.bpm140);
    interactions.count++;
  } else if (interactions.count === interactions.levels.l){
    $(`#secret-4`).text(` Et c'est la chance qui te laisse `);
    interactions.count++;
  } else if (interactions.count === interactions.levels.m){
    $(`#secret-4`).text(` Et c'est la chance qui te laisse avec `);
    playBackgroundMusic(backgroundSound.bpm150);
    interactions.count++;
  } else if (interactions.count === interactions.levels.n){
    $(`#secret-4`).text(` Et c'est la chance qui te laisse avec une pile `);
    interactions.count++;
  } else if (interactions.count === interactions.levels.o){
    $(`#secret-4`).text(` Et c'est la chance qui te laisse avec une pile de remords `);
    playBackgroundMusic(backgroundSound.bpm160);
    interactions.count++;
  }
}


/* answer methods related to dialogs*/

// answer dialog after closing dialog1 (callback)
function answerDialog(dialog, positiveAnswer) {
  // change what the dialog says
  if (positiveAnswer) {
    $(`#dialog-question`).text(dialog.answer1);
  } else {
    $(`#dialog-question`).text(dialog.answer2);
  };

  // remove the buttons
  $(`#dialog`).dialog({
    buttons: [],
  });

  // open the dialog
  $(`#dialog`).dialog("open");

  // add the close event listener
  $("#dialog").on("dialogclose", function(event, ui) {
    // invert the color of the ascii image reference
    invertAscii();
    // set a timer to open the next dialog
    setTimeout(() => {
      modifyDialog(dialogParameters.cycle); // open the next dialog
      openDialog();
    }, 5000)
    // remove the event listener
    $("#dialog").off("dialogclose");
  });
}

// effects happening after answering dialog1
function effectsDialog1() {
  // change the posterize value of the ascii code art
  asciiArt.posterizeValue += 0.5;

  // change the blend mode and opactiy of the overlay
  $(`.blend`).css("mix-blend-mode", "difference");
  $(`.blend`).css("opacity", "0.25");
}

// effects happening after answering dialog1
function effectsDialog2() {
  // change the posterize value of the ascii code art
  asciiArt.posterizeValue = 8;

  // change the blend mode and opactiy of the overlay
  $(`.blend`).css("mix-blend-mode", "soft-light");
  $(`.blend`).css("opacity", "1");

  // move the sun down
  $(`#sun-gif`).css("top", "15em");
}



/* p5 native methods */

// listens to the user pressing keys
function keyPressed() {
  // keep track of the number of interactions
  interactions.count++;

  // when user presses the hidden random key,
  if (keyCode === randomKey) {
    // close all dialogs (maybe find another thing to do in the futur, like close some, open others, or change the buttons options?)
    $(`#dialog`).dialog("close");
    // get a new random key
    getRandomkey();
  };

  // check stuff
  if (key === `a`) {
    // alert($(".blend").css("opacity"));
  }
}

// listens to the user clicking the mouse
function mousePressed() {
  // let user starts the audio at first click
  userStartAudio();

  // keep track of the number of interactions
  interactions.count++;
}
