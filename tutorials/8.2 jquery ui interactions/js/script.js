$(`#tunnel`).hide();

$(`#introduction-dialog`).dialog({
  modal: true,
  resizable: false,
  buttons: {
    "escape tunnel": function() {
      $(this).dialog(`close`);
      $(`#tunnel`).show({
        effect: `blind`,
      });
    },
    "imagination": function() {
      $(`#prisoner`).draggable(`option`, `containment`, `none`);
      $(this).dialog(`close`);
    },
  },
});

$(`#prisoner`).effect({
  effect: `shake`,
  duration: 2000,
  times: 20,
  distance: 6,
  complete: makePrisonerDraggable,
});

$(`#tunnel`).droppable({
  drop: function(event, ui) {
    ui.draggable.remove();
    $(this).hide({
      effect: `blind`,
      duration: 3000,
    })
  }
})

function makePrisonerDraggable() {
  $(`#prisoner`).draggable({
    containment: "#prison",
    start: function() {
      $(this).addClass(`prisoner-dragging`, 750);
    },
    stop: function() {
      $(this).removeClass(`prisoner-dragging`, 750);
    }
  });
}
