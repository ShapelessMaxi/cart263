/**
Les Daltons - Prison Break
Maxime Perreault
*/

"use strict";

// refer to the current state of the program
let state; // possible states : `intro`, `cell`, `yard`, `visitRoom`, `tunnel`, `end`

// store the fonts used in the program
let typewriterFont = undefined;
let titleFont = undefined;
let titleImage = undefined;
let endTitle = undefined;

// store the images of the characters
let joeImg = undefined;
let jackImg = undefined;
let williamImg = undefined;
let averellImg = undefined;

// store the images of the npcs
let guardianImg = undefined;
let maImg = undefined;

// store the images of the portraits (ui)
let daltonsPortrait = undefined;
let maPortrait = undefined;
let guardianPortrait = undefined;

// store the images of the tools icons (ui)
let pickaxIcon = undefined;
let spoonIcon = undefined;
let breadIcon = undefined;

// store the images of the objects to be interacted with
let bedImg = undefined;
let letterImg = undefined;

// store the sound effects and music
let mainMelody = undefined;
let secondaryMelody = undefined;
let interactionDing = undefined;
let daySound = undefined;

// store the time and date here
let recordedData = {
  day: 2,
  month: `mai`,
  hours: 9,
  minutes: 15,
  visit: { day: undefined, month: undefined },
  pickaxeObtained: false,
  spoonObtained: false,
  boulderBroken: false,
  letterPicked: false,
  letterRead: false,
  breadReceived: false,
  breadEaten: false,
  holeDug: false,
  ableToDig: false,
  visited: false,
};

/**
-load images
  - characters
  - portraits
  - tools
- load fonts
*/
function preload() {
  // load the images of the characters
  joeImg = loadImage(`assets/images/joe.png`);
  jackImg = loadImage(`assets/images/jack.png`);
  williamImg = loadImage(`assets/images/william.png`);
  averellImg = loadImage(`assets/images/averell.png`);
  // load the images of the npcs
  guardianImg = loadImage(`assets/images/guard.png`);
  maImg = loadImage(`assets/images/ma.png`);
  // load the image of the portraits
  daltonsPortrait = loadImage(`assets/images/profilesdalton.png`);
  maPortrait = loadImage(`assets/images/maportrait.png`);
  guardianPortrait = loadImage(`assets/images/guardianportrait.png`);
  // load the images of the tools
  pickaxIcon = loadImage(`assets/images/pickicon.png`);
  spoonIcon = loadImage(`assets/images/spoonicon.png`);
  breadIcon = loadImage(`assets/images/bread.png`);
  // load the images of the objects to be interacted with
  bedImg = loadImage(`assets/images/bed.png`);
  letterImg = loadImage(`assets/images/letter.png`);

  // load the fonts used in the program
  typewriterFont = loadFont(`assets/fonts/IBMPlexMono-Regular.ttf`);
  titleFont = loadFont(`assets/fonts/PermanentMarker-Regular.ttf`);
  titleImage = loadImage(`assets/images/Titre.png`);
  endTitle = loadImage(`assets/images/Fin.png`);

  // load the sound effects and music
  mainMelody = loadSound(`assets/sounds/simplemelody.mp3`);
  secondaryMelody = loadSound(`assets/sounds/fastmelody.mp3`);
  interactionDing = loadSound(`assets/sounds/bip.wav`);
  daySound = loadSound(`assets/sounds/ding.wav`);
}

/**
set the framerate to a stable number
create a canvas
load (or create) the locally stored time and date data
create the intro state as the starting point
 */
function setup() {
  // set the framerate to a stable number
  frameRate(30);
  // create the canvas
  createCanvas(1000, 750);

  // try to load the stored date data
  let data = JSON.parse(localStorage.getItem(`time-date-dalton-data`));
  // check if there is data stored
  if (data !== null) {
    // copy data into recorded time object
    recordedData.day = data.day;
    recordedData.month = data.month;
    recordedData.hours = data.hours;
    recordedData.minutes = data.minutes;
    recordedData.visit.day = data.visit.day;
    recordedData.visit.month = data.visit.month;
    recordedData.pickaxeObtained = data.pickaxeObtained;
    recordedData.spoonObtained = data.spoonObtained;
    recordedData.boulderBroken = data.boulderBroken;
    recordedData.letterPicked = data.letterPicked;
    recordedData.letterRead = data.letterRead;
    recordedData.breadReceived = data.breadReceived;
    recordedData.breadEaten = data.breadEaten;
    recordedData.holeDug = data.holeDug;
    recordedData.ableToDig = data.ableToDig;
    recordedData.visited = data.visited;
  } else {
    // no data yet, start at day 1, 09:05 am
    recordedData.day = 2;
    recordedData.month = `mai`;
    recordedData.hours = 9;
    recordedData.minutes = 15;
    recordedData.visit.day = `undefined`;
    recordedData.visit.month = `undefined`;
    recordedData.pickaxeObtained = false;
    recordedData.spoonObtained = false;
    recordedData.boulderBroken = false;
    recordedData.letterPicked = false;
    recordedData.letterRead = false;
    recordedData.breadReceived = false;
    recordedData.breadEaten = false;
    recordedData.holeDug = false;
    recordedData.ableToDig = false;
    recordedData.visited = false;
    localStorage.setItem(`time-date-dalton-data`, JSON.stringify(recordedData));
  }

  // create the intro state
  state = new IntroState();
}

/**
update the program's current state
*/
function draw() {
  // update the program's current state
  state.update();
}

/**
call the current state's mousePressed method
*/
function mousePressed() {
  // call the current state's mousePressed method
  state.mousePressed();
}

// delete local data when 'c' is pressed
function keyPressed() {
  // call the current state keyPressed() method
  state.keyPressed();

  if (key === `c`) {
    // delete local spy profile data
    localStorage.removeItem(`time-date-dalton-data`);
  } else if (key === `v`) {
    // save time and date with 'z'
    localStorage.setItem(`time-date-dalton-data`, JSON.stringify(recordedData));
  }
}
