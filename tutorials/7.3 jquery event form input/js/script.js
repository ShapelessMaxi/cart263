$(`#example-button`).on(`click`, function(event) {
  // Use .val() to get the current value in the text input
  let input = $(`#example-text-input`).val();
  alert(input);
});

$(`#range-slider`).on(`change`, function(event) {
  let input = $(this).val();
  alert(input);
});
