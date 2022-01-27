/*
Maxime Perreault
Slamina

How do you spell Animals backwards ?
Slamina is a guessing game where the player has to guess which animal the computer
is saying. The thing is the computer reverse the name of the animal before saying it!

Click the mouse to have the computer tell you a reversed animal name, and try to
guess it by saying it the 'unreversed' way.
*/

"use strict";

// 'animal names' dataset
// from -> https://github.com/dariusk/corpora/blob/master/data/animals/common.json
const animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra",
];

// store the current animal name to guess
let currentAnimal = undefined;

// store the current answer from the user
let currentAnswer = undefined;

// create a canvas, set up the annyang commands, set up the text format
function setup() {
  // create a canvas
  createCanvas(windowWidth, windowHeight);

  // checks if annyang is installed correctly
  if (annyang) {
    // create a voice command
    let commands = {
      "I think it is *animal": guessAnimal,
      hello: function () {
        console.log(`ur dumb`);
      },
    };
    annyang.addCommands(commands);
    annyang.start();

    // set up the text format
    textSize(150);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
  }
}

// draw the visual elements
function draw() {
  // draw the background
  background(150, 100, 100);

  //
  if (currentAnswer === currentAnimal) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  text(currentAnswer, width / 2, height / 2);
}

// start the guessing game when the user press the mouse
function mousePressed() {
  // choose a random animal to guess
  currentAnimal = random(animals);
  // reverse the current animal name
  let reversedAnimal = reverseString(currentAnimal);
  // say the reversed animal name out loud
  responsiveVoice.speak(reversedAnimal);
}

// register the current guess as the current answer
function guessAnimal(animal) {
  // store the current answer (in lower case)
  currentAnswer = animal.toLowerCase();
  console.log(currentAnimal);
}

// reverse a string
// code from -> https://pippinbarr.github.io/cart263/activities/slamina.html
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split("");
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join("");
  // Return the result
  return result;
}
