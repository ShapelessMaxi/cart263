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
  color: undefined, // possible choices for color with (complementary in parenthesis) : blue(orange), red(green), yellow(purple)
  mode: undefined, // possible modes : dark mode (background is dark), light mode(background is light)
  complexity: undefined, // possible choices : simple, medium, complex
  // could add some more visual parameters here, like angle, font, size, etc...
};

// refer to the visual paramenter ui (only displayed if no data in local storage)
let ui = {
  mode: undefined,
  color: undefined,
  complexity: undefined,
  submit: undefined,
};

// refer to the complementary color (linked to colorScheme chosen by user)
let complementaryColor = 0; // default value

// refer to the number of word object generated
let numWords = 50; // default value
// store all the word objects here
let words = [];

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
initiate the alerts and prompt for the login process
*/
function setup() {
  // create the canvas
  createCanvas(windowWidth, 500);

  // initiate the local process
  loginProcess();

  // define how much words to generate depending on the complexity chosen
  if (userInfo.complexity === `simple`) {
    numWords = 50;
  } else if (userInfo.complexity === `medium`) {
    numWords = 100;
  } else if (userInfo.complexity === `complex`) {
    numWords = 200;
  }
}

// create a bunch of word objects
function createWords() {
  for (let i = 0; i < numWords; i++) {
    let x = random(0, width);
    let y = random(height, 0);
    let currentWord = new Word(x, y, userInfo.color, userInfo.mode);
    words.push(currentWord);
  }
}

// takes care of asking for username and password
// also save data into local storage
function loginProcess() {
  // tell the user how to reset
  alert(`press 'c' to reset login info and parameters.`);

  // try to load the stored profile
  let data = JSON.parse(localStorage.getItem(`word-art-generator-data`));
  // check if there is data stored
  if (data !== null) {
    // there is data
    // copy userInfo object into local storage
    userInfo.username = data.username;
    userInfo.password = data.password;
    userInfo.color = data.color;
    userInfo.mode = data.mode;
    userInfo.complexity = data.complexity;

    // ask for user's username
    let username = prompt(`enter username`);
    if (username === userInfo.username) {
      // ask for user's password
      let password = prompt(`enter ur password`);
      while (password !== userInfo.password) {
        password = prompt(`wrong password, enter ur password`);
      }
      // chose complementary color (background color)
      choseComplementary();
    }
  } else {
    // no data stored, display the ui generate a user profile
    displayUi();
    generateUserProfile();
  }
}

// display the ui to choose visual parameters
// code mostly from Pippin
function displayUi() {
  // mode radio buttons
  ui.mode = createRadio(`modeContainer`);
  ui.mode.option(`light`);
  ui.mode.option(`dark`);
  // color scheme radio buttons
  ui.color = createRadio(`colorContainer`);
  ui.color.option(`blue`);
  ui.color.option(`red`);
  ui.color.option(`yellow`);
  // complexity radio buttons
  ui.complexity = createRadio(`complexityContainer`);
  ui.complexity.option(`simple`);
  ui.complexity.option(`medium`);
  ui.complexity.option(`complex`);

  // submit button to save into local storage
  ui.submit = createButton(`submit`);
  ui.submit.mousePressed(function () {
    userInfo.mode = ui.mode.value();
    userInfo.color = ui.color.value();
    userInfo.complexity = ui.complexity.value();
    localStorage.setItem(`word-art-generator-data`, JSON.stringify(userInfo));

    // disable the ui buttons
    ui.mode.disable(true);
    ui.color.disable(true);
    ui.complexity.disable(true);
    ui.submit.hide(true);

    // chose complementary color (background color)
    choseComplementary();

    // create a bunch of word objects
    createWords();
  });
}

// ask and save the username and password
function generateUserProfile() {
  // ask for the user's username
  userInfo.username = prompt(`enter new username`);

  // ask for a password
  userInfo.password = prompt(`enter new password`);

  // save the  word art generator data in local web storage
  localStorage.setItem(`word-art-generator-data`, JSON.stringify(userInfo));
}

/*
draw the background
display the word objects
*/
function draw() {
  // draw the background
  background(complementaryColor);

  // draw the words
  for (let i = 0; i < words.length; i++) {
    let currentWord = words[i];
    currentWord.update();
  }
}

// chooses the color of the background
function choseComplementary() {
  // decide which color the background should be
  // depends on chosen color scheme and mode
  if (userInfo.color === `blue`) {
    if (userInfo.mode === `light`) {
      complementaryColor = color(181, 131, 85); // light orange
    } else {
      complementaryColor = color(51, 36, 22); // dark orange
    }
  } else if (userInfo.color === `red`) {
    if (userInfo.mode === `light`) {
      complementaryColor = color(101, 171, 117); // light green
    } else {
      complementaryColor = color(16, 33, 20); // dark green
    }
  } else {
    if (userInfo.mode === `light`) {
      complementaryColor = color(167, 143, 191); // light purple
    } else {
      complementaryColor = color(36, 26, 46); // dark purple
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
