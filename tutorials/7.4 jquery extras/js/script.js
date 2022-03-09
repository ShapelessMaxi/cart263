// Highlight the main heading
$(`.header`).addClass(`highlight`);

// If the user clicks on the headers, remove the highlight
$(`.header`).on(`click`, function(event) {
  $(this).removeClass(`highlight`);
});

// setInterval(function() {
//   $(`.header`).toggleClass(`highlight`);
// }, 500);

// $(`#button`).on(`click`, function(event) {
//   $(`#main-heading`).hide();
//   setTimeout(function() {
//     $(`#main-heading`).show();
//   }, 2000);
// });

// $(`#button`).on(`click`, function(event) {
//   $(`.header`).toggle();
// });

// $(`#button`).on(`click`, function(event) {
//   $(`.header`).slideUp(4000, function(){
//     $(this).fadeIn(2000);
//   });
// });

// $(`#button`).on(`click`, function(event) {
//   $(`.header`).animate({
//     "opacity": 0.5,
//     "font-size": "3rem"
//   }, 2000, function(){
//     $(this).text("ANIMATED");
//   });
// });

$(`#button`).on(`click`, function(event) {
  $(`.header`).animate({
  "opactiy": 0.1,
  "height": `200px`,
}, {
  duration: 5000,
  complete: function(){
    $(this).text(`ANIMATED!`);
  },
  easing:`linear`
  });
});

$(`.header`).each(function() {
  let reverseText = $(this).text().split(``).reverse().join(``);
  $(this).text(reverseText);
});
