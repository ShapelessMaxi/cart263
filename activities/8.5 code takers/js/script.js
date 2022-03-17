/**
code taker activity
Maxime Perreault

following video activity
*/

"use strict";

$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "i kno.": function(){
      $(this).dialog(`close`);
    },
  },
});

$(`.secret`).one(`mouseover`, function(event) {
  $(this).addClass(`found`, 500);
  $(this).draggable({
    helper: `clone`,
  });
});

$(`#answer`).droppable({
  drop: function(event, ui) {
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);

    // check if tey got the right answer
    if (this.text === `Theremin`){
      $(`#solved-dialog`).dialog(`open`);
    }
  },
});
