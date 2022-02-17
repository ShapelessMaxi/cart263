/**
Les Daltons - Prison Break
Maxime Perreault

In this program, you control the Dalton brothers, more specifically, you control
Joe, and the three other brothers follow Joe in different ways. For example,
Averell is the dumb, one, so he sometimes stops randomly and if he gets out of a
certain radius, he stops following altogether. You need to be in a group of 4 to
interact with stuff.

The goal is to get out of the prison. There's a bit of a narrative to follow
(with hints) kind of like a plan that works, but the player has freedom as to where
they want to explore.

Prison break plan :
1- you get out of the cell at 'lunch time' (fact check what they call it), and go
talk to a guardian (located near a boulder) that gives you all a pickaxe.
2- you break the boulder, and theres a letter from Ma that was hidden under it.
the letter says that Ma will visit on the 13th of march (theres a calendar ui now?).
3- you have to go to your cell and sleep to pass the days (its currently the 12).
4- Ma visits and gives you a bread. When you eat the bread, you discover 4 spoons
that were hidden inside of it. thx Ma.
5- you dig a tunnel in the cell, and get out!
6- lil ending screen with Rantanplan 'arresting' you?
*/

"use strict";

// refer to the current state of the program
let state; // possible states : `intro`, `cell`, `yard`, `visitRoom`, `tunnel`, `end`

// store the images of the characters
let joeImg = undefined;
let jackImg = undefined;
let williamImg = undefined;
let averellImg = undefined;

/**
load images of the characters
*/
function preload() {
  // load the images of the characters
  joeImg = loadImage(`assets/images/joe.png`);
  jackImg = loadImage(`assets/images/jack.png`);
  williamImg = loadImage(`assets/images/william.png`);
  averellImg = loadImage(`assets/images/averell.png`);
}

/**
set the framerate to a stable number
create a canvas
create the intro state as the starting point
 */
function setup() {
  // set the framerate to a stable number
  frameRate(30);
  // create the canvas
  createCanvas(1000, 750);

  // create the intro state
  state = new CellState();
}

/**
update the program's current state
*/
function draw() {
  // update the program's current state
  state.update();
}

/**
call the current state's mousePressed method
*/
function mousePressed() {
  // call the current state's mousePressed method
  state.mousePressed();
}
