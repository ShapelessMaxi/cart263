/**
Code Taker exercise
Maxime Perreault

improvement on the 8.5 activity

- being able to move the letters around in the answer box
- improve drasticaly the format/ visuals
- add a second hidden word in the first word (now that were able to rearrange the answer)
*/

"use strict";

// create the winning dialog
$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "i kno.": function(){
      $(this).dialog(`close`);
    },
  },
});

// add a visual class to the correct letters when moused over
$(`.secret`).one(`mouseover`, function(event) {
  $(this).addClass(`found`, 500);
  $(this).draggable({
    helper: `clone`,
  });
});

// make the letters of the answer sortable
$(`#answer`).sortable();

// create the droppable answer box
$(`#answer`).droppable({
  accept: `.secret`,
  drop: function(event, ui) {
    // create a span for each answer letters
    let letter = ui.draggable.text();
    let span = $(`<span class="answer-letter">${letter}</span>`)

    // add the span to the answer box
    $(this).append(span);

    // make the letters in the poem not draggable anymore
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);

    // check if the user got the right answer
    if (this.text === `Theremin`){
      $(`#solved-dialog`).dialog(`open`);
    }
  },
});
