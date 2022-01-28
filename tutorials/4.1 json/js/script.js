"use strict";

let tarotData = undefined;
let fortune = `nothing yet...`;

function preload() {
  tarotData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`
  );
}

function setup() {
  createCanvas(windowWidth, 150);

  let card = random(tarotData.tarot_interpretations);
  fortune = random(card.fortune_telling);
}

function draw() {
  background(130, 130, 200);

  push();
  textSize(16);
  textAlign(CENTER, CENTER);
  fill(250, 250, 255);
  text(fortune, width / 2, height / 2);
  pop();
}
//
// function mousePressed() {
//   loadJSON(`assets/data/tarot_interpretations.json`, tarotLoaded);
// }
//
// function tarotLoaded(data) {
//   tarotData = data;
//
//   let card = random(tarotData.tarot_interpretations);
//   fortune = random(card.fortune_telling);
// }
