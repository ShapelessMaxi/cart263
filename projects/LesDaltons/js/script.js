/**
Les Daltons - Prison Break
Maxime Perreault

In this program, you control the Dalton brothers, more specifically, you control
Joe, and the three other brothers follow Joe in different ways. For example,
Averell is the dumb, one, so he sometimes stops randomly and if he gets out of a
certain radius, he stops following altogether. You need to be in a group of 4 to
interact with stuff.

The goal is to get out of the prison. There's a bit of a narrative to follow
(with hints) kind of like a plan that works, but the player has freedom as to where
they want to explore.

Prison break plan :
1- you get out of the cell at 'lunch time' (fact check what they call it), and go
talk to a guardian (located near a boulder) that gives you all a pickaxe.
2- you break the boulder, and theres a letter from Ma that was hidden under it.
the letter says that Ma will visit on the 13th of march (theres a calendar ui now?).
3- you have to go to your cell and sleep to pass the days (its currently the 12).
4- Ma visits and gives you a bread. When you eat the bread, you discover 4 spoons
that were hidden inside of it. thx Ma.
5- you dig a tunnel in the cell, and get out!
6- lil ending screen with Rantanplan 'arresting' you?
*/

"use strict";

// refer to the current state of the program
let state; // possible states : `intro`, `cell`, `yard`, `visitRoom`, `tunnel`, `end`

// store the fonts used in the program
let typewriterFont = undefined;
let titleFont = undefined;
let titleImage = undefined;

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

// store the images of the objects to be interacted with
let bedImg = undefined;
let letterImg = undefined;

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
  // load the images of the objects to be interacted with
  bedImg = loadImage(`assets/images/bed.png`);
  letterImg = loadImage(`assets/images/letter.png`);

  // load the fonts used in the program
  typewriterFont = loadFont(`assets/fonts/IBMPlexMono-Regular.ttf`);
  titleFont = loadFont(`assets/fonts/PermanentMarker-Regular.ttf`);
  titleImage = loadImage(`assets/images/Titre.png`);
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
    localStorage.setItem(`time-date-dalton-data`, JSON.stringify(recordedData));
  }

  // create the intro state
  state = new VisitRoomState();
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
