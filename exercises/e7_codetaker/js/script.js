/**
code taker
Maxime Perreault

- X improve the visuals
- X make the letters rearrangeable
- 2 answer
*/

"use strict";

// define the current answer
let currentAnswer = `Theremin`;
// keep track if the game has been reset
let gameIsReset = false;

// start the game
startGame();

// create the solved dialog
$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "yep": function() {
      // close the dialog and open the second one
      $(this).dialog(`close`);
      if (!gameIsReset) {
        $(`#second-dialog`).dialog(`open`);
      };
    },
  },
});

// create the 2nd attempt dialog
$(`#second-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "yess": function() {
      // set the second answer
      currentAnswer = `mint`;
      // add secret class to the new letters
      $(`.reset`).addClass(`secret`);
      // close the dialog
      $(this).dialog(`close`);
      // empty the answer box
      $(`#answer`).empty();
      // reset the game
      gameIsReset = true;
      requestAnimationFrame(startGame);
    },
    "nop": function() {
      // close the dialog and open the second one
      $(this).dialog(`close`);
      $(`#third-dialog`).dialog(`open`);
    },
  },
});

// create the third dialog
$(`#third-dialog`).dialog({
  autoOpen: false,
});

function startGame() {
  if (!gameIsReset) {
    // add visuals when mousing over the correct letters
    $(`.secret`).one(`mouseover`, function(event) {
      $(this).addClass(`found`, 500);
      $(this).draggable({
        helper: `clone`,
      });
    });
  } else {
    // add visuals when mousing over the correct letters
    $(`.reset`).one(`mouseover`, function(event) {
      $(this).addClass(`found`, 500);
      $(this).draggable({
        helper: `clone`,
      });
    });
  };
}

// make the answer letters sortable
$(`#answer`).sortable({
  update: checkAnswer,
});

// make the answer letters droppable
$(`#answer`).droppable({
  accept: ".secret",
  drop: function(event, ui) {
    // create a span with the letter inside
    let letter = ui.draggable.text();
    let span = $(`<span class="answer-letter">${letter}</span>`)

    // append the span to the answer box
    $(this).append(span);

    // make the letters in the text no longer draggable
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);

    // check if tey got the right answer
    checkAnswer();
  },
});

// check if the answer is right
function checkAnswer() {
  if ($(`#answer`).text() === currentAnswer) {
    $(`#solved-dialog`).dialog(`open`);
  }
}
