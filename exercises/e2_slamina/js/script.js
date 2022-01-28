/*
Maxime Perreault
Slamina +

Do you think you've done bad things recently?
surely you did. ill even listen to the good things!
confess.

the user is prompted to confess their sins to the computer. its a computer, what could happen?
the computer listens... and react to different keywords.
theres a counter of good, and another counter of bad...
the screen gets darker as you say bad things, and lighter as you tell good things.
*/

"use strict";

// store the background image here
let bg = undefined;
// object properties for red overlay background filter
let filter = {
  color: {
    r: 255,
    g: 100,
    b: 100,
  },
  alpha: {
    current: 70,
    min: 15,
    max: 30,
  },
  animDriver: 0,
};

// store the good and bad side overlay here
let goodSide = {
  img: undefined,
  translateAmount: -1200,
};
let badSide = {
  img: undefined,
  translateAmount: 1200,
};

// object properties for the first scrolling prompt
let prompt1 = {
  x1: -100,
  x2: undefined,
  speed: 2.2,
};
// object properties for the second scrolling prompt
let prompt2 = {
  x1: -100,
  x2: undefined,
  speed: 1.8,
};

// list of possible bad words
const badWords = /kill|killed|satan|sex|cum|porn|rape|hide|hid|jealous|jealousy|lazy|hell|attacked|attack|envy|lust|pride|greed|fuck|damn|bitch|cunt|bastard|slut|profanities|whore|prostitution|prostitute|gay|drugs/;
const badWordArray = [
  `kill`,
  `killed`,
  `satan`,
  `sex`,
  `cum`,
  `porn`,
  `rape`,
  `hide`,
  `hid`,
  `jealous`,
  `jealousy`,
  `lazy`,
  `hell`,
  `attacked`,
  `attack`,
  `envy`,
  `lust`,
  `pride`,
  `greed`,
  `fuck`,
  `damn`,
  `bitch`,
  `cunt`,
  `bastard`,
  `slut`,
  `profanities`,
  `whore`,
  `prostitution`,
  `prostitute`,
  `gay`,
  `drugs`,
];

// list of possible good words
const goodWords = /love|loved|give|gave|help|helped|innocent|favor|clear|straight|humility|patience|patient|diligent|diligence|abstinence|loyal|loyalty|chastity|heal|healed|served|service|right|harmless|proper|beauty|grace/;
const goodWordArray = [
  `love`,
  `loved`,
  `give`,
  `gave`,
  `help`,
  `helped`,
  `innocent`,
  `favor`,
  `clear`,
  `straight`,
  `humility`,
  `patience`,
  `patient`,
  `diligent`,
  `diligence`,
  `abstinence`,
  `loyal`,
  `loyalty`,
  `chastity`,
  `heal`,
  `healed`,
  `served`,
  `service`,
  `right`,
  `harmless`,
  `proper`,
  `beauty`,
  `grace`,
];

// store the last good and bad words the user said
let currentGoodWord = {
  str: undefined,
  color: {
    r: 0,
    g: 255,
    b: 0,
    a: 150,
  },
};
let currentBadWord = {
  str: undefined,
  color: {
    r: 255,
    g: 0,
    b: 0,
    a: 150,
  },
};

// keep count of the good and bad words
let badCounter = 5;
let goodCounter = 5;

// decide if user goes to hell or note
let goingToHell = false;
let goingToParadise = false;

// load imgaes, create a canvas, set up the annyang commands
function setup() {
  // load images
  bg = loadImage(`assets/images/starbg.png`);
  goodSide.img = loadImage(`assets/images/goodSide.png`);
  badSide.img = loadImage(`assets/images/badSide.png`);

  // create a canvas
  createCanvas(windowWidth, windowHeight);

  // set the position of the scrolling prompts duplicates
  prompt1.x2 = width + 500;
  prompt2.x2 = width + 800;

  // checks if annyang is installed correctly
  if (annyang) {
    // create a voice command listening to what the user says
    let commands = {
      "*everything": listening,
    };
    annyang.addCommands(commands);
    annyang.start();
  } else {
    alert('load this "page" in Google Chrome plz!');
  }
}

// draw the visual elements
function draw() {
  // draw the background
  backgroundElements();

  // draw the game prompt
  promptElements();

  // prompt anmimation going right to left
  promptAnimation();

  // display the last good and bad word said by the user
  displayBadWord();
  displayGoodWord();

  // display the good side and the bad side
  displayGoodSide();
  displayBadSide();

  // display the ending screens
  if (goingToHell) {
    displayHell();
  } else if (goingToParadise) {
    displayParadise();
  }
}

// draw the background elements
function backgroundElements() {
  // draw a white layer
  background(255, 255, 255);

  // draw a red flashing layer
  push();
  rectMode(CORNERS);
  fill(filter.color.r, filter.color.g, filter.color.b, filter.alpha.current);
  rect(0, 0, width, height);
  pop();
  // animate the red layer
  backgroundAnimation();

  // draw a blue star cutout layer (image)
  push();
  imageMode(CORNERS);
  image(bg, 0, 0, width, height);
  pop();
}

// animate the flickering background
function backgroundAnimation() {
  filter.animDriver += 1;
  filter.alpha.current = cos(filter.animDriver);
  filter.alpha.current = map(
    filter.alpha.current,
    -1,
    1,
    filter.alpha.min,
    filter.alpha.max
  );
}

// draw the prompt text elements
function promptElements() {
  // set up the text format
  push();
  textSize(60);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  fill(filter.color.r, filter.color.g, filter.color.b, 80);
  text(`confess your sins, out loud, pls.`, prompt1.x1, 200);
  text(`confess your sins, out loud, pls.`, prompt1.x2, 200);
  text(`am computer, nothing will happen :-)`, prompt2.x1, height - 200);
  text(`am computer, nothing will happen :-)`, prompt2.x2, height - 200);
  pop();
}

// animation of the text going left to right
function promptAnimation() {
  // first prompt animation
  prompt1.x1 -= prompt1.speed;
  if (prompt1.x1 < -2400) {
    prompt1.x1 = width;
  }
  // duplicate of the first prompt
  prompt1.x2 -= prompt1.speed;
  if (prompt1.x2 < -2400) {
    prompt1.x2 = width;
  }
  // second prompt animation
  prompt2.x1 -= prompt2.speed;
  if (prompt2.x1 < -2800) {
    prompt2.x1 = width;
  }
  // duplicate of the second prompt
  prompt2.x2 -= prompt2.speed;
  if (prompt2.x2 < -2800) {
    prompt2.x2 = width;
  }
}

// listens to the user confessing their sins
function listening(everything) {
  // check if the user said 'bad' keywords
  let saidBad = badWords.test(everything);
  // check if the user said 'good' keywords
  let saidGood = goodWords.test(everything);

  // actions depending on what type of word the user said
  if (saidBad && saidGood) {
    // user said a good and a bad word
    checkWhichWord(badWordArray, everything);
    checkWhichWord(goodWordArray, everything);

    // activate the good and bad counter
    let voiceBypass = true;
    badWordCounter(voiceBypass);
    goodWordCounter(voiceBypass);

    // computer says mmmmmm creepily
    if (goodCounter > 2) {
      responsiveVoice.speak(`mmmmm`, `UK English Male`, {
        pitch: 0.5,
        rate: 0.75,
      });
    }
  } else if (saidBad) {
    // user said a bad word
    // check which word they said
    checkWhichWord(badWordArray, everything);

    // activate the bad counter
    badWordCounter();
  } else if (saidGood) {
    // user said a good word
    // check which word they said
    checkWhichWord(goodWordArray, everything);

    // activate the good counter
    goodWordCounter();
  } else {
    // user said neither a good or a bad word
    // computer says tell me more creepily
    responsiveVoice.speak(`tell me more`, `UK English Male`, {
      pitch: 0.5,
      rate: 0.75,
    });
  }
}

// compares what the user said with a list of word
// change the current word being displayed if it matches
function checkWhichWord(array, whatTheySaid) {
  for (let i = 0; i < array.length; i++) {
    let currentKeyword = array[i];
    if (whatTheySaid.includes(currentKeyword)) {
      if (array === badWordArray) {
        currentBadWord.str = currentKeyword;
        currentBadWord.str = currentBadWord.str.toUpperCase();
      } else {
        currentGoodWord.str = currentKeyword;
        currentGoodWord.str = currentGoodWord.str.toUpperCase();
      }
    }
  }
}

// display the last bad word
function displayBadWord() {
  push();
  fill(
    currentBadWord.color.r,
    currentBadWord.color.g,
    currentBadWord.color.b,
    currentBadWord.color.a
  );
  textStyle(BOLD);
  textSize(90);
  textAlign(CENTER, CENTER);
  text(currentBadWord.str, width / 1.25, height / 2);
  pop();
}

// display the last good word
function displayGoodWord() {
  push();
  fill(
    currentGoodWord.color.r,
    currentGoodWord.color.g,
    currentGoodWord.color.b,
    currentGoodWord.color.a
  );
  textSize(90);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(currentGoodWord.str, width / 4, height / 2);
  pop();
}

// display the good side
function displayGoodSide() {
  push();
  // translate to the right
  translate(goodSide.translateAmount, 0);
  imageMode(CORNERS);
  image(goodSide.img, 0, 0, width, height);
  pop();
}

// display the bad side
function displayBadSide() {
  push();
  //translate to the left
  translate(badSide.translateAmount, 0);
  imageMode(CORNERS);
  image(badSide.img, 0, 0, width, height);
  pop();
}

// activate the bad word counter, then activate the hell screen
function badWordCounter(voiceBypass) {
  badCounter -= 1;
  if (badCounter > 0) {
    badSide.translateAmount -= 300;

    // say something creepily
    if (!voiceBypass) {
      responsiveVoice.speak(`this is what I need to hear`, `UK English Male`, {
        pitch: 0.5,
        rate: 1,
      });
    }
  } else {
    // ur going to hell
    goingToHell = true;
    // say welcome to hell after 3 seconds
    setTimeout(function () {
      responsiveVoice.speak(`welcome to hell`, `UK English Male`, {
        pitch: 0.5,
        rate: 0.75,
      });
    }, 2000);

    // stop listening
    annyang.pause();
  }
}

// activate the good word counter, then activate the paradise screen
function goodWordCounter(voiceBypass) {
  goodCounter -= 1;
  if (goodCounter > 0) {
    goodSide.translateAmount += 300;

    // say something creepily
    if (!voiceBypass) {
      responsiveVoice.speak(
        `find something more appropriate`,
        `UK English Male`,
        {
          pitch: 0.5,
          rate: 1,
        }
      );
    }
  } else {
    // ur going to hell
    goingToParadise = true;
    // say welcome to hell after 3 seconds
    setTimeout(function () {
      responsiveVoice.speak(`you're still going to hell`, `UK English Male`, {
        pitch: 0.5,
        rate: 0.75,
      });
    }, 2000);

    // stop listening
    annyang.pause();
  }
}

// display the hell end screen
function displayHell() {
  push();
  fill(255, 30, 30);
  rectMode(CORNERS);
  rect(0, 0, width, height);
  pop();

  push();
  fill(10, 10, 10);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(`u belong in hell :-)`, width / 2, height / 2);
  pop();
}

// display the paradise end screen
function displayParadise() {
  push();
  fill(200, 200, 255);
  rectMode(CORNERS);
  rect(0, 0, width, height);
  pop();

  push();
  fill(240, 240, 240);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(`where did you think you were going ;u;`, width / 2, height / 2);
  pop();
}
