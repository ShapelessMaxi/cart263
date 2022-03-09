// // remove the main heading when clicking on it
// $(`#main-heading`).on(`click`, function(event){
//   // refer to the event target with `this`
//   $(this).remove();
// });

// add text on every click on the section
$(`section`).on(`click`, function(event){
  $(this).append(`<p>this will be added on every click</p>`)
});

// add text on the first click on the section
$(`section`).one(`click`, function(event){
  $(this).append(`<p>this will be added one time click</p>`)
});


// // special event listener
// $(`#main-heading`).click(function(event){
//   // refer to the event target with `this`
//   $(this).css(`color`, `red`);
// });

// remove event listeners
$(`.header`).on(`click`, function(event){
  $(this).css(`color`, `red`);
  $(`.header`).off(`click`);
});
