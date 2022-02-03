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

// store user data here
let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`,
};

//  store the JSON data files here
let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;

/**
load images
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
  createCanvas(650, windowHeight);

  // try to load the stored profile
  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));
  // check if there is data stored
  if (data !== null) {
    // there is data
    // ask for user password
    let password = prompt(`enter your secret password`);
    if (password === data.password) {
      // copy data into spyProfile object
      spyProfile.name = data.name;
      spyProfile.alias = data.alias;
      spyProfile.secretWeapon = data.secretWeapon;
      spyProfile.password = data.password;
    }
  } else {
    // no data stored, generate a spy profile
    generateSpyProfile();
  }
}

// takes care of all the spy profile generation steps
function generateSpyProfile() {
  // ask for the user's name
  spyProfile.name = prompt(`tell me ur name...`);
  // choose a random instrument for the alias
  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;
  // choose a random object for the secret weapon
  spyProfile.secretWeapon = random(objectData.objects);
  // choose a random keywords linked to a random tarot card for the password
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  // save the profile in local web storage
  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

/**
draw the background
display the profile text
*/
function draw() {
  // draw the background
  background(90, 80, 80);

  // create the template for the profile
  let profile = `** SPY PROFILE **
name: ${spyProfile.name}
alias: ${spyProfile.alias}
secret weapon: ${spyProfile.secretWeapon}
password: ${spyProfile.password}`;

  // display the profile
  push();
  textFont(`Courier, monospace`);
  textSize(26);
  textAlign(LEFT, TOP);
  fill(255);
  text(profile, 25, 155);
  pop();
}

// delete local data when 'c' is pressed
function keyPressed() {
  if (key === `c`) {
    // delete local spy profile data
    localStorage.removeItem(`spy-profile-data`);
  }
}
