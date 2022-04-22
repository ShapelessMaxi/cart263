/**
Incapacité
Maxime Perreault

Mixed media visual adventure where the user input has unexpected effects.
*/

"use strict";

/* global variables and objects */

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
    started: false,
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
  delay: 3000,
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
    answer1: `Ok good luck with that.`,
    answer2: `Alright.`,
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
    answer1: `You cannot reach them from here.`,
    answer2: `Not that you could reach them anyway.`,
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
    question: `Is there anything you want to accomplish?`,
    answer1: `ah.`,
    button1: {
      text: `I want to/ I need to/ I have to/ I`,
      click: () => {
        // apply some effects
        effectsDialog3();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog3, true);
      },
    },
  },
  dialog4: {
    question: `Why are you abstaining from contact?`,
    answer1: `Still trying uh.`,
    answer2: `Fine.`,
    button1: {
      text: `Contact me now.`,
      click: () => {
        // apply some effects
        effectsDialog4();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog4, true);
      },
    },
    button2: {
      text: `Do not contact me.`,
      click: () => {
        // apply some effects
        effectsDialog4();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog4, false);
      },
    },
  },
  dialog5: {
    question: `Is there any other way?`,
    answer1: `Maybe.`,
    button1: {
      text: `maybe`,
      click: () => {
        // apply some effects
        effectsDialog5();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog5, true);
      },
    },
    button2: {
      text: `maybe`,
      click: () => {
        // apply some effects
        effectsDialog5();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog5, true);
      },
    },
    button3: {
      text: `maybe`,
      click: () => {
        // apply some effects
        effectsDialog5();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog5, true);
      },
    },
    button4: {
      text: `maybe`,
      click: () => {
        // apply some effects
        effectsDialog5();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog5, true);
      },
    },
  },
  dialog6: {
    question: `Nothing and everything matters here, right?`,
    answer1: `That's what I thought.`,
    answer2: `That's not what I thought.`,
    button1: {
      text: `right`,
      click: () => {
        // apply some effects
        effectsDialog6();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog6, true);
      },
    },
    button2: {
      text: `wrong`,
      click: () => {
        // apply some effects
        effectsDialog6();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog6, false);
      },
    },
  },
  dialog7: {
    question: `You had to be there to understand.`,
    answer1: `soooo... what now?`,
    button1: {
      text: `click here to understand`,
      click: () => {
        // apply some effects
        effectsDialog7();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog7, true);
      },
    },
  },
  dialog8: {
    question: `,,,,,,,,,--,,,,.,,,,,,,,,,,,..,,,,,,,.`,
    answer1: `000i0t000 is000t 000ine`,
    button1: {
      text: `%`,
      click: () => {
        // apply some effects
        effectsDialog8();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog8, true);
      },
    },
    button2: {
      text: `@`,
      click: () => {
        // apply some effects
        effectsDialog8();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog8, true);
      },
    },
    button3: {
      text: `&`,
      click: () => {
        // apply some effects
        effectsDialog8();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog8, true);
      },
    },
    button4: {
      text: `#`,
      click: () => {
        // apply some effects
        effectsDialog8();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog8, true);
      },
    },
    button5: {
      text: `~`,
      click: () => {
        // apply some effects
        effectsDialog8();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog8, true);
      },
    },
    button6: {
      text: `/`,
      click: () => {
        // apply some effects
        effectsDialog8();
        // close the dialog
        $(`#dialog`).dialog("close");
        // open the answer dialog
        setTimeout(answerDialog, 2000, dialogData.dialog8, true);
      },
    },
  },
}

// store the background cloud image here
let backgroundCloud = undefined;

// keep track of the amount of interactions (clicks and keypresses)
let interactions = {
  count: 0,
  levels: {
    a: 5,
    b: 10,
    c: 13,
    d: 15,
    e: 20,
    f: 22,
    g: 23,
    h: 29,
    i: 30,
    j: 33,
    k: 34,
    l: 38,
    m: 40,
    n: 42,
    o: 48,
  },
}

// store the background sound objects here
let backgroundSound = {
  amp: 0.5,
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

// keep track of the program being started
let firstClicked = false;
let programStarted = false;

// store the speed of the flickering animation here
let flickerTimer = 10000;


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
create, modify and open the dialogs
play the background music
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
      at: `center`,
      of: window,
    },
    buttons: [],
    title: dialogParameters.title,
    open: function() {
      $(".ui-dialog-titlebar-close").hide();
    },
  }, );

  // add the buttons
  modifyDialog(dialogNumber);
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
    case 6:
      currentDialog = dialogData.dialog6;
      break;
    case 7:
      currentDialog = dialogData.dialog7;
      break;
    case 8:
      currentDialog = dialogData.dialog8;
      break;
    default:
      currentDialog = undefined;
  };

  if (currentDialog != undefined) {
    // set the question of the dialog
    $(`#dialog-question`).text(currentDialog.question);

    // delete the x button
    $(`#dialog`).dialog({
      open: function() {
        $(".ui-dialog-titlebar-close").hide();
      },
    });

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
  } else {
    // dialog is undefined (happens when the dialog cycle value is over 9)
    $(`#dialog`).dialog("close");
  }
}

// play and loop the background music
function playBackgroundMusic(sound) {
  // stop other background music if it"s playing
  for (let i = 0; i < bgSounds.length; i++) {
    if (checkPlaying(bgSounds[i])) {
      bgSounds[i].stop();
    }
  };

  // play (loop) the sound
  if (sound.isLoaded()) {
    sound.amp(backgroundSound.amp);
    sound.loop()
  };
}

// check if a sound is playing or looping, returns true or fale
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
draw other images
*/
function draw() {
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
  if (pngSequence.alphaAnim.started) {
    pngSequence.alphaAnim.wave = sin(pngSequence.alphaAnim.t);
    pngSequence.alphaAnim.wave = map(pngSequence.alphaAnim.wave, -1, 1, pngSequence.darkestAlpha, pngSequence.lightestAlpha);
    pngSequence.alphaAnim.t += pngSequence.alphaAnim.speed;
    pngSequence.alpha = pngSequence.alphaAnim.wave;
  };
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

// fade out animation for the intro cover div
function fadeOutCover() {
  let steps = 11;
  for (let i = 0; i < steps; i++) {
    // reduce the opacity
    setTimeout(() => {
      let currentOpacity = $(`.cover`).css("opacity");
      let newOpacity = currentOpacity - 0.1;
      $(`.cover`).css("opacity", `${newOpacity}`);
    }, i * 800);
    if (i === 10) {
      setTimeout(() => {
        // open the first dialog
        openDialog();
      }, 8000);
    }
  }
}

// flickering animation for color overlay
function flicker() {
  // start an interval that goes on forever
  setInterval(function() {
    // get the current display value of the overlay
    let currentOpacity = $(`.flickering`).css("display");
    if (currentOpacity === `none`) {
      // change the display value
      $(`.flickering`).css("display", "block");
      // re change the display value after a second
      setTimeout(() => {
        $(`.flickering`).css("display", "none");
      }, 700);
    } else {
      // change the display value
      $(`.flickering`).css("display", "none");
      // re change the display value after a second
      setTimeout(() => {
        $(`.flickering`).css("display", "block");
      }, 700);
    }
  }, flickerTimer);
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

  // remove the buttons and add the x button
  $(`#dialog`).dialog({
    buttons: [],
    open: function() {
      $(".ui-dialog-titlebar-close").show();
    },
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
      dialogParameters.delay // remove the event listener
      $("#dialog").off("dialogclose");
    });
  });
}

// effects happening after answering dialog1
function effectsDialog1() {
  // change the posterize value of the ascii code art
  asciiArt.posterizeValue += 0.5;

  // change the blend mode and opactiy of the overlay
  $(`.blend`).css("background-color", "darkblue");
  $(`.blend`).css("mix-blend-mode", "difference");
  $(`.blend`).css("opacity", "0.25");
}

// effects happening after answering dialog2
function effectsDialog2() {
  // change the posterize value of the ascii code art
  asciiArt.posterizeValue = 8;

  // change the blend mode and opactiy of the overlay
  $(`.blend`).css("mix-blend-mode", "soft-light");
  $(`.blend`).css("opacity", "1");

  // move the sun down 7 times
  let drops = 7;
  for (let i = 0; i < drops; i++) {
    setTimeout(() => {
      let currentHeight = parseInt($(`#sun-gif`).css("top"));
      currentHeight += 40;
      $(`#sun-gif`).css("top", `${currentHeight}px`);
    }, i * 800);
  };
}

// effects happening after answering dialog3
function effectsDialog3() {
  // change the posterize value of the ascii code art
  asciiArt.posterizeValue = 45;

  // change the blend mode and opactiy of the overlay
  $(`.blend`).css("background-color", "orange");
  $(`.blend`).css("opacity", "0.5");

  // start the alpha animation on the 3d img sequence
  pngSequence.alphaAnim.started = true;

  // start the flickering overlay animation
  flicker();
}

// effects happening after answering dialog4
function effectsDialog4() {
  // change the posterize value of the ascii code art
  asciiArt.posterizeValue = 5;

  // change the size of the third cloud
  let currentWidth = parseInt($(`#cloud3-img`).css("width"));
  currentWidth *= 3;
  let currentHeight = parseInt($(`#cloud3-img`).css("height"));
  currentHeight *= 3;
  $(`#cloud3-img`).css("width", `${currentWidth}px`);
  $(`#cloud3-img`).css("height", `${currentHeight}px`);
  $(`#cloud3-img`).css("left", `0`);
  $(`#cloud3-img`).css("top", `-50%`);
  $(`#cloud3-img`).css("opacity", `60%`);

  // add a contrast filter
  $(`.effect`).css("backdrop-filter", "contrast(2)");

  // change the speed of the flicker animation
  flickerTimer = 8000;
}

// effects happening after answering dialog5
function effectsDialog5() {
  // change the posterize value of the ascii code art
  asciiArt.posterizeValue = 2;

  // change the blend mode and opactiy of the overlay
  $(`.blend`).css("background-color", "red");
  $(`.blend`).css("mix-blend-mode", "difference");
  $(`.background-texture`).css("opacity", "70%");

  // move the text div in front
  $(`#poem`).css("z-index", "5");
  $(`#poem`).css("opacity", "100%");

  // flip and move the holding hand gif
  $(`#hands-gif`).css("transform", "scaleX(-1)");

}

// effects happening after answering dialog6
function effectsDialog6() {
  // change the posterize value of the ascii code art
  asciiArt.posterizeValue = 45;

  // change the ascii table
  modifyAsciiTable();

  // change the speed of the flicker animation
  flickerTimer = 5000;
}

// effects happening after answering dialog7
function effectsDialog7() {
  // change the posterize value of the ascii code art
  asciiArt.posterizeValue = 45;

  // change the blend mode and opactiy of the overlay
  $(`.effect`).css("backdrop-filter", "blur(30px)");

  // change the speed of the flicker animation
  flickerTimer = 3000;
}

// effects happening after answering dialog8
function effectsDialog8() {
  // change the posterize value of the ascii code art and ivnert it
  asciiArt.posterizeValue = 45;
  invertAscii();

  // move the text and make it bigger
  $(`#poem`).css("bottom", "10%");
  $(`#side`).css("font-size", "20px");
  $(`#side`).css("color", "lightblue");

  // change the speed of the flicker animation
  flickerTimer = 1000;
}


/* interaction listener methods */

// listens to the user pressing keys
function keyPressed() {
  // keep track of the number of interactions
  interactions.count++;
}

// listens to the user clicking the mouse
function mousePressed() {
  // let user starts the audio
  userStartAudio();

  // check if the user clicked for the first time
  if (!firstClicked) {
    // keep track of the program being started
    firstClicked = true
    // reveal the 'click to reveal' intro text
    $(`.intro`).css("display", "inline-block");
    //get out of the if statement
    return
  } else if (!programStarted) {
    if (!backgroundSound.bpm160.isLoaded()) {
      // the last sound is not loaded, get out of the if statement
      return;
    } else {
      // play and loop the background music
      playBackgroundMusic(backgroundSound.bpm80);
      // start the fade out animation of the cover
      fadeOutCover();
      // keep track of the program being started
      programStarted = true;
    }
  }

  // keep track of the number of interactions
  interactions.count++;
}

// change the background music and reveal the secret poem according to the levels of the interaction counter
function interactionCounterEffect() {
  if (interactions.count === interactions.levels.a) {
    $(`#secret-1`).text(` À égale `);
    playBackgroundMusic(backgroundSound.bpm90);
    interactions.count++;
  } else if (interactions.count === interactions.levels.b) {
    $(`#secret-1`).text(` À égale mesure, `);
    interactions.count++;
  } else if (interactions.count === interactions.levels.c) {
    $(`#secret-1`).text(` À égale mesure, peu importe `);
    playBackgroundMusic(backgroundSound.bpm100);
    interactions.count++;
  } else if (interactions.count === interactions.levels.d) {
    $(`.gif-texture`).css("opacity", "0.1");
    $(`#secret-1`).text(` À égale mesure, peu importe à quel point `);
    interactions.count++;
  } else if (interactions.count === interactions.levels.e) {
    $(`.gif-texture`).css("opacity", "0.2");
    $(`#secret-1`).text(` À égale mesure, peu importe à quel point tu essaie, `);
    playBackgroundMusic(backgroundSound.bpm110);
    interactions.count++;
  } else if (interactions.count === interactions.levels.f) {
    $(`.gif-texture`).css("opacity", "0.3");
    $(`#secret-2`).text(` Tu échoue `);
    interactions.count++;
  } else if (interactions.count === interactions.levels.g) {
    $(`.gif-texture`).css("opacity", "0.4");
    $(`#secret-2`).text(` Tu échoue et tu réussi `);
    playBackgroundMusic(backgroundSound.bpm120);
    interactions.count++;
  } else if (interactions.count === interactions.levels.h) {
    $(`.gif-texture`).css("opacity", "0.5");
    $(`#secret-3`).text(` C'est ta vie `);
    interactions.count++;
  } else if (interactions.count === interactions.levels.i) {
    $(`.gif-texture`).css("opacity", "0.6");
    $(`#secret-3`).text(` C'est ta vie qui se transforme `);
    playBackgroundMusic(backgroundSound.bpm130);
    interactions.count++;
  } else if (interactions.count === interactions.levels.j) {
    $(`.gif-texture`).css("opacity", "0.7");
    $(`#secret-3`).text(` C'est ta vie qui se transforme avec la chance `);
    interactions.count++;
  } else if (interactions.count === interactions.levels.k) {
    $(`.gif-texture`).css("opacity", "0.8");
    $(`#secret-4`).text(` Et c'est la chance `);
    playBackgroundMusic(backgroundSound.bpm140);
    interactions.count++;
  } else if (interactions.count === interactions.levels.l) {
    $(`.gif-texture`).css("opacity", "0.9");
    $(`#secret-4`).text(` Et c'est la chance qui te laisse `);
    interactions.count++;
  } else if (interactions.count === interactions.levels.m) {
    $(`.gif-texture`).css("opacity", "1");
    $(`#secret-4`).text(` Et c'est la chance qui te laisse avec `);
    playBackgroundMusic(backgroundSound.bpm150);
    interactions.count++;
  } else if (interactions.count === interactions.levels.n) {
    $(`#secret-4`).text(` Et c'est la chance qui te laisse avec une pile `);
    interactions.count++;
  } else if (interactions.count === interactions.levels.o) {
    $(`#secret-4`).text(` Et c'est la chance qui te laisse avec une pile de remords `);
    playBackgroundMusic(backgroundSound.bpm160);
    interactions.count++;
  }
}
