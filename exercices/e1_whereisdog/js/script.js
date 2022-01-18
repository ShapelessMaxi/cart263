/**
Maxime Perreault

This is the first exercise of the semester and I feel super out of touch with coding.

In this game, the user has to find a sausage dog that is inside a groupe of other animals.
**/

"use strict";

const NUM_ANIMAL_IMAGES = 10;
let numAnimals = {
  easy: 50,
  medium: 100,
  hard: 150,
};

let state = `menu`; // possible states: menu, game, end

// store the images for the animals here
let animalImages = [];
// store the animal objects here
let animals = [];

// store the sausage dog image and object
let sausageDogImg = undefined;
let sausageDog = undefined;

// define the button objects
let easyButton = undefined;
let mediumButton = undefined;
let hardButton = undefined;

// store the title font here
let titleFont = undefined;

// preload the images of the animals and fonts
function preload() {
  // load the title font
  titleFont = loadFont(`assets/fonts/ChocoDonut.ttf`);

  // load every images of animal
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    // store the images here
    animalImages.push(animalImage);
  }

  // load sausage dog image
  sausageDogImg = loadImage(`assets/images/sausage-dog.png`);
}

// create the canvas and the animal objects
function setup() {
  createCanvas(windowWidth, windowHeight);

  // create the animal objects
  for (let i = 0; i < numAnimals.hard; i++) {
    // choose a random location
    let x = random(0, width);
    let y = random(0, height);
    // choose a random image
    let animalImage = random(animalImages);
    // create a new animal
    let animal = new Animal(x, y, animalImage);
    // store the animal here
    animals.push(animal);
  }

  // create sausage dog object
  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImg);
}

// draw the correct elements depending on the current state
function draw() {
  if (state === `menu`) {
    menu();
  } else if (state === `easyGame`) {
    easyGame();
  } else if (state === `mediumGame`) {
    easyGame();
  } else if (state === `hardGame`) {
    easyGame();
  } else if (state === `end`) {
    end();
  }
}

// draw the menu screen elements
function menu() {
  // draw the background
  background(186, 106, 167);

  // draw the text in the menu
  menuText();

  // draw sausage dogs
  menuDogs();

  // create and draw the buttons
  menuButtons();
}

// draw text in the menu
function menuText() {
  // draw the title/prompt of the game
  push();
  fill(255);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(55);
  textFont(titleFont);
  text(`i've lost my sausage dog ... :-(`, width / 2, height / 6);
  pop();

  // draw difficulty prompt
  push();
  fill(255);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(35);
  textFont(titleFont);
  text(`chooose a difficulty :`, width / 2, height / 1.8);
  pop();
}

// draw dogs in the menu
function menuDogs() {
  for (let i = 0; i < 15; i++) {
    // define the spacing between the dogs
    let spacing = i * 150;
    push();
    imageMode(CENTER);
    translate(0, height / 3);
    image(sausageDogImg, 0 + spacing, 0);
    pop();
  }
}

// create and display difficulty buttons
function menuButtons() {
  // define the easy button position and color
  let easyX = width / 2 - 300;
  let y = height / 1.6;
  let easyColor = color(0, 255, 149);
  // create the easy button object
  easyButton = new Button(easyX, y, `easy`, easyColor);
  // display the easy button
  easyButton.update();

  // define the easy button position and color
  let mediumX = width / 2;
  let mediumColor = color(227, 201, 109);
  // create the easy button object
  mediumButton = new Button(mediumX, y, `medium`, mediumColor);
  // display the medium button
  mediumButton.update();

  // define the easy button position and color
  let hardX = width / 2 + 300;
  let hardColor = color(171, 60, 80);
  // create the easy button object
  hardButton = new Button(hardX, y, `hard`, hardColor);
  // display the hard button
  hardButton.update();
}

// draw the game elements with easy difficulty
function easyGame() {
  // draw the background
  background(240, 240, 90);

  // draw the animals
  for (let i = 0; i < numAnimals.easy; i++) {
    animals[i].update();
  }
  // draw the sausage dog
  sausageDog.update();
}

// draw the end screen elements
function end() {
  // draw the background
  background(150, 150, 200);
}

// register the mouse being pressed
function mousePressed() {
  // change the state when clicking menu buttons
  easyButton.mousePressed();
  mediumButton.mousePressed();
  hardButton.mousePressed();

  // apply rotation to the sausage dog when clicked
  sausageDog.mousePressed();
}
