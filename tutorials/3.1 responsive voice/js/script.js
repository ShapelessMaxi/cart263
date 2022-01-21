"use strict";

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(40, 10, 10);
  responsiveVoice.speak(
    "comment va-tu bing bong je vais a la piscine",
    "French Male",
    {
      pitch: 0.5,
      rate: 0.5,
      volume: 1,
    }
  );
}
