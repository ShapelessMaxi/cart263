/**
seeking sadness
Maxime Perreault

adding to the activity
1- Add title and instructions scenes
2-
3-
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
