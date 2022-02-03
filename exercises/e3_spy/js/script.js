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
  colorScheme: undefined, // possible choices for color with (complementary in parenthesis) : blue(orange), red(green), yellow(purple)
  mode: undefined, // possible modes : dark mode (background is dark), light mode(background is light)
  complexity: undefined, // possible choices : light, medium, heavy
  // could add some more visual parameters here, like angle, font, size, etc...
};

// refer to the complementary color (linked to colorScheme chosen by user)
let complementaryColor = undefined;

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
  // chose complementary color (background color)
  choseComplementary();

  // try to load the stored profile
  let data = JSON.parse(localStorage.getItem(`word-art-generator-data`));
  // check if there is data stored
  if (data !== null) {
    // there is data
    // ask for user's username
    let username = prompt(`enter username`);
    if (username === userInfo.username) {
      // ask for user's password
      let password = prompt(`enter ur password`);
      while (password !== userInfo.password) {
        password = prompt(`enter ur password`);
      }
      // copy userInfo object into local storage
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
  background(complementaryColor);
}

// chooses the color of the background
function choseComplementary() {
  // decide which color the background should be
  // depends on chosen color scheme and mode
  if (userInfo.colorScheme === `blue`) {
    if (userInfo.mode === `light`) {
      complementaryColor = color(181, 131, 85); // light orange
    } else {
      complementaryColor = color(54, 30, 4); // dark orange
    }
  } else if (userInfo.colorScheme === `red` && userInfo.mode === `light`) {
    if (userInfo.mode === `light`) {
      complementaryColor = color(85, 181, 99); // light green
    } else {
      complementaryColor = color(2, 38, 8); // dark green
    }
  } else {
    if (userInfo.mode === `light`) {
      complementaryColor = color(138, 82, 196); // light purple
    } else {
      complementaryColor = color(19, 2, 36); // dark purple
    }
  }
}

// delete local data when 'c' is pressed
function keyPressed() {
  if (key === `c`) {
    // delete local word art generator data
    localStorage.removeItem(`word-art-generator-data`);
  }
}
