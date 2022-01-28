"use strict";

let clicks = 0;

let gameData = {
  highScore: 0,
};

let userData = {
  name: `stranger`,
};

function setup() {
  createCanvas(windowWidth, windowHeight);

  // get game data item
  let data = JSON.parse(localStorage.getItem(`click-attack-game-data`));
  // if game data exists
  if (data !== null) {
    gameData = data;
  } // if not, do nothing

  // get name data
  let nameData = JSON.parse(
    localStorage.getItem(`web-storage-example-personalization`)
  );
  // if name data exists
  if (nameData !== null) {
    userData.name = nameData;
  } else {
    // if not, ask for the name
    userData.name = prompt(`what is your name?`); // return a string
    localStorage.setItem(
      `web-storage-example-personalization`,
      JSON.stringify(userData.name)
    );
  }
}

function draw() {
  background(200);

  // display clicks
  push();
  textSize(95);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  fill(250);
  text(clicks, width / 2, height / 2);
  pop();

  // display highScore
  push();
  textSize(20);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  fill(150);
  text(`High score: ${gameData.highScore}`, 100, 100);
  pop();

  // display the user's name
  push();
  textSize(20);
  textAlign(RIGHT, TOP);
  textStyle(BOLD);
  fill(150);
  text(`your name: ${userData.name}`, width - 100, 100);
  pop();
}

function mousePressed() {
  // register a click
  clicks++;

  // register highScore
  if (clicks > gameData.highScore) {
    gameData.highScore = clicks;
    // store highScore in local web storage
    localStorage.setItem(`click-attack-game-data`, JSON.stringify(gameData));
  }
}

function keyPressed() {
  if (key === `c`) {
    // delete game data + highScore
    localStorage.removeItem(`click-attack-game-data`);
    // delete name data
    localStorage.removeItem(`web-storage-example-personalization`);
  }
}
