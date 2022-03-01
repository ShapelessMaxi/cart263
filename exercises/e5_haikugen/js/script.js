/**
Haiku generator
Maxime Perreault

following activity video
*/

"use strict";

let fiveSyllableLines = [
  `O, to be a tree`,
  `The cat does not know`,
  `We are all forests`,
  `You have done your best`,
  `They are all gone now`,
];

let sevenSyllableLines = [
  `Say the things left unsaid`,
  `Never believe the wind's lies`,
  `The autumn stretches its legs`,
  `Nothing can satisfy you`,
  `They will not come back again`,
];

let line1 = random(fiveSyllableLines);
let line2 = random(sevenSyllableLines);
let line3 = random(fiveSyllableLines);

let line1P = document.getElementById(`line-1`);
let line2P = document.getElementById(`line-2`);
let line3P = document.getElementById(`line-3`);

line1P.innerText = line1;
line2P.innerText = line2;
line3P.innerText = line3;

line1P.addEventListener(`click`, lineClicked);
line2P.addEventListener(`click`, lineClicked);
line3P.addEventListener(`click`, lineClicked);

function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}

function lineClicked(event) {
  fadeOut(event.target, 1);
}

function setNewLine(element) {
  if (element === line1P || element === line3P) {
    element.innerText = random(fiveSyllableLines);
  } else if (element === line2P) {
    element.innerText = random(sevenSyllableLines);
  }
}

function fadeOut(element, opacity) {
  opacity -= 0.02;
  element.style[`opacity`] = opacity;
  if (opacity > 0) {
    requestAnimationFrame(function () {
      fadeOut(element, opacity);
    });
  } else {
    setNewLine(element);
    fadeIn(element, opacity);
  }
}

function fadeIn(element, opacity) {
  opacity += 0.02;
  element.style[`opacity`] = opacity;
  if (opacity < 1) {
    requestAnimationFrame(function () {
      fadeIn(element, opacity);
    });
  } else {
    // do nothing
  }
}
