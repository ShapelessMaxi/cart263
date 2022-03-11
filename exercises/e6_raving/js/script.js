/**
interactive scroll
Maxime Perreault

> exercice 6

randomly picked sentences and words scrolling horizontaly
use the keypad to scroll faster to the left or right
and to add an color change effect on the text

> text from : https://mashable.com/article/queer-aesthetic-tiktok-rainbow-capitalism-queerbaiting-fashion
*/

"use strict";

$(`#paragraph1`).bind("mousewheel", function() {
  return false;
});

// keep track of the up and down movement (w and s keys)
let down = false;
let up = false;

// keep track of the left and right controllers (a and d keys)
let left = false;
let right = false;

// define the scroll speed
let scrollSpeed = 50;

// refer to the paragraph1
let $p = $(`#paragraph1`);

// get the middle of $p
let $middleOfP = $p[0].scrollHeight / 2;
// set the scroll position to the middle of $p
$p.scrollTop($middleOfP);


// start the update loop
window.requestAnimationFrame(update);

// update the program
function update() {
  // keydown event
  $(document).on(`keydown`, function(event) {
    // keycode for 's' -> 83
    if (event.keyCode === 83) {
      up = true;
      // keycode for 'w' -> 87
    } else if (event.keyCode === 87) {
      down = true;
      // keycode for 'a' -> 65
    } else if (event.keyCode === 65) {
      left = true;
      // keycode for 'a' -> 68
    } else if (event.keyCode === 68) {
      right = true;
    };
  });

  // takes care of the navigation (up and down)
  navigation();

  // takes care of applying effects
  effectController();

  // not pressing the keys anymore, set to false
  up = false;
  down = false;
  left = false;
  right = false;

  // restart the loop
  window.requestAnimationFrame(update);
};

// takes care of the navigation (up and down)
function navigation() {
  if (up) {
    $p.scrollTop($p.scrollTop() - scrollSpeed);
    randomizeSize();
  };
  if (down) {
    $p.scrollTop($p.scrollTop() + scrollSpeed);
    randomizeSize();
  };
};

// apply effects depending on which keys you press
function effectController() {
  if (up) {
    randomizeSize();
    let chance = Math.random();
    if (chance < 0.05) {
      colorShift();
    }
  };
  if (down) {
    randomizeSize();
    let chance = Math.random();
    if (chance < 0.05) {
      colorShift();
    }
  };
  if (left) {
    colorShift();
    let chance = Math.random();
    if (chance < 0.1) {
      randomizeSize();
    };
  }
  if (right) {
    colorShift();
    let chance = Math.random();
    if (chance < 0.1) {
      randomizeSize();
    }
  };
}

// randomize the text size
function randomizeSize() {
  let max = 24;
  let min = 15;
  let randomValue = Math.floor(Math.random() * (max - min) + min)
  $(`#paragraph1`).css(`font-size`, `${randomValue}px`);
};

// shift the color of the gradient
function colorShift() {
  let chance = Math.random();
  if (chance < 0.33) {
    $p.css(`background-color`, `#2818ba`);
    $p.css(`background-image`, 'linear-gradient(90deg, #2818ba, #af4261)');
  } else if (chance > 0.33 && chance < 0.66) {
    $p.css(`background-color`, `#2ed144`);
    $p.css(`background-image`, 'linear-gradient(90deg, #2818ba, #2ed144)');
  } else if (chance > 0.66) {
    $p.css(`background-color`, `#b85723`);
    $p.css(`background-image`, 'linear-gradient(90deg, #b85723, #2ed144)');
  }
}
