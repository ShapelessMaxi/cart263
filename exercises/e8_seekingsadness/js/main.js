/**
seeking sadness
Maxime Perreault

adding to the activity
1- Add title and instructions scenes X
2- Add a counter of sadness and hapiness X
3- Add an ending to the game (run out of time? too happy?) and a “game over” scene
*/

"use strict";

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: `arcade`,
  },
  scene: [Boot, Play, Title],
}

let game = new Phaser.Game(config);
