/**
Word Art Generator
Maxime Perreault

generative word art from json files

1- ask the user for a color scheme and a level of complexity
2- generate : a) go fish out some words (quantity depends on level of complexity saved in web storage) from various JSON files
              b) position it on the right and flip it
              c) aply color scheme that user has chosen (the color scheme is saved in web storage)
              d) reset $complexity and $colorscheme with pressing a key
*/

"use strict";

// refer to the users basic login info and visual parameters chosen by the users
let userInfo = {
  username: undefined,
  password: undefined,
  // visual parameters
  colorScheme: { main: undefined, complementary: undefined },
  /*
  possible choices for main with (complementary in parenthesis) :
  blue(orange), red(green), yellow(purple)
  */
  mode: undefined, // possible modes : dark mode (background is dark), light mode(background is light)
  complexity: undefined, // possible choices : light, medium, heavy
  // could add some more parameters here, like angle, secondary color, font, etc...
};

//  refer to the JSON data files
let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;

/**
load JSON data files
*/
function preload() {
  // load JSON instrument data
  instrumentData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`
  );
  // load JSON instrument data
  objectData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`
  );
  // load JSON tarot data
  tarotData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`
  );
}

/**
create the canvas
*/
function setup() {
  // create the canvas
  createCanvas(windowWidth, windowHeight);

  // choose the secondary color

  // try to load the stored profile
  let data = JSON.parse(localStorage.getItem(`word-art-generator-data`));
  // check if there is data stored
  if (data !== null) {
    // there is data
    // ask for user password
    let password = prompt(`enter ur password`);
    if (password === loginInfo.password) {
      // copy data into spyProfile object
    }
  } else {
    // no data stored, generate a user profile
    generateUserProfile();
  }
}

//
function generateUserProfile() {
  // ask for the user's username
  userInfo.username = prompt(`enter username`);

  // ask for a password
  userInfo.password = prompt(`enter ur password`);

  // save the  word art generator data in local web storage
  localStorage.setItem(`word-art-generator-data`, JSON.stringify(userInfo));
}

/**
draw the background
display the word objects
*/
function draw() {
  // draw the background
  background(90, 80, 80);
}

// delete local data when 'c' is pressed
function keyPressed() {
  if (key === `c`) {
    // delete local word art generator data
    localStorage.removeItem(`word-art-generator-data`);
  }
}
