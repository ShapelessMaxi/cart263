// let textInput = document.getElementById(`text-input`);
// let submitButton = document.getElementById(`submit-button`);
//
// submitButton.addEventListener(`click`, function (event) {
//   let input = textInput.value;
//   alert(input);
// });
//
// textInput.addEventListener(`keydown`, function (event) {
//   if (event.keyCode === 13) {
//     let input = textInput.value;
//     alert(input);
//   }
// });

let slider = document.getElementById(`slider`);
let checkButton = document.getElementById(`check-button`);

checkButton.addEventListener(`click`, function (event) {
  let value = slider.value;
  alert(value);
});

slider.addEventListener(`change`, function (event) {
  alert(slider.value);
});
