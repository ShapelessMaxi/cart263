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

// randomize the text size
function randomizeSize() {
  let max = 24;
  let min = 15;
  let randomValue = Math.floor(Math.random() * (max - min) + min)
  $(`body`).css(`font-size`, `${randomValue}px`);
};
