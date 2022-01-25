"use strict";

function setup() {
  createCanvas(500, 500);

  if (annyang) {
    let commands = {
      'i hate u': function () {
        alert(`blingblong`);
      },
    };
    annyang.addCommands(commands);
    annyang.start();
  }
}

function draw() {
  background(15, 15, 40);
}
