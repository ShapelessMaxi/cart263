"use strict";

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  let config = {
    x: 250,
    y: 250,
    width: 200,
    height: 200,
    fillColor: {
      r: 255,
      g: 255,
      b: 0,
    },
    mode: CENTER,
  };
  let anotherConfig = {
    x: 250,
    y: 250,
    width: 100,
    height: 100,
    fillColor: {
      r: 25,
      g: 25,
      b: 250,
    },
    mode: CORNER,
  };
  drawFancyRect(config);
  drawFancyRect(anotherConfig);
}

function drawFancyRect({ x, y, width, height, fillColor, mode }) {
  push();
  fill(fillColor.r, fillColor.g, fillColor.b);
  rectMode(mode);
  rect(x, y, width, height);
  pop();
}
