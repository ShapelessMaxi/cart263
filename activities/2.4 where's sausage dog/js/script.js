"use strict";

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 50;

let animalImages = [];
let animals = [];

let sausageDogImg = undefined;
let sausageDog = undefined;

function preload() {
  // load every images of animal
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    // store the image here
    animalImages.push(animalImage);
  }

  // load sd img
  sausageDogImg = loadImage(`assets/images/sausage-dog.png`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // create the animals
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

  // create sd obj
  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImg);
}

function draw() {
  background(240, 240, 90);

  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }

  sausageDog.update();
}

function mousePressed() {
  sausageDog.mousePressed();
}
