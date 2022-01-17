/**

**/

"use strict";

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 50;

// store the images for the animals here
let animalImages = [];
// store the animal objects here
let animals = [];

// store the sausage dog image and object
let sausageDogImg = undefined;
let sausageDog = undefined;

// preload the images of the animals
function preload() {
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
  for (let i = 0; i < NUM_ANIMALS; i++) {
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

// draw the game elements
function draw() {
  background(240, 240, 90);

  // draw the animals
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }

  // draw the sausage dog
  sausageDog.update();
}

// register the mouse being pressed
function mousePressed() {
  // apply rotation to the sausage dog when clicked
  sausageDog.mousePressed();
}
