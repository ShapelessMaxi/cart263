/**
redacted document
Maxime Perreault

following the 7.5 activity video
*/

"use strict";

//
setInterval(revelation, 500);

//
function revelation(){
  $(`.redacted`).each(attemptReveal);
}

//
function attemptReveal(){
  let r = Math.random();
  if (r < 0.1) {
    $(this).removeClass(`redacted`);
    $(this).addClass(`revealed`);
  };
}

//
$(`.top-secret`).on(`click`, redact);

//
function redact(){
  $(this).removeClass(`revealed`);
  $(this).addClass(`redacted`);
}
