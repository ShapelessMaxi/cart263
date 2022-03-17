/**
Incapacite
Maxime Perreault

This is the prototype for my final project

In this program, I wanted to explore the idea of invalidating the user input, redering them incapable of
saving the world. The world is represented by abstract 2d/3d/ascii art. The user will be prompted simple
questions or directives, but the program will either ignore or have completly strange and
seemingly unrelated behaviors. The goal is to have the user questions wether their input made had any effect
on whats happening on the screen.

1- import video, in the form of a 3d animated model
  (for now, this is taken from a previous project, but it could be an entirely new model to fit the final project)
2- import the ascii generator library and convert the video

3- try to layer a few videos using css to alter the opacity of each
4- try to mess up the interal ascii art (code, conversion algorithm?)
*/

"use strict";

let vid = undefined;

/**
 */
function preload() {

}

/**
 */
function setup() {
  background(255, 255, 255);

  vid = createVideo(
    `assets/videos/claw+heart.mp4`,
    vidLoad
  );

  vid.size(500, 500);
}

// This function is called when the video loads
function vidLoad() {
  vid.loop();
  vid.volume(0);
}

/**
 */
function draw() {

}
