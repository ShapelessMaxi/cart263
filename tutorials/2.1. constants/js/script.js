"use strict";

const PI = 3.14159;
const I_LUV_U = true;
const MY_LOVELY_CAT_IS_CALLED = `Lucy`;

const NUM_CIRCLES = 50;
let circle = {
  alpha: 5,
  color: 255,
  size: 12,
};

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(50, 50, 50);

  circle.alpha = map(mouseX, 0, width, 0, 255);

  for (let i = 0; i < NUM_CIRCLES; i++) {
    push();
    noStroke();
    fill(circle.color, circle.alpha);
    ellipse(width / 2, height / 2, i * circle.size);
    pop();
  }
}
