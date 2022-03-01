// refer to the paragraph
let paragraph = document.getElementById(`paragraph`);
// let opacity = 1;

// // change the color in 3 second
// setTimeout(function () {
//   paragraph.style[`color`] = `red`;
// }, 3000);

// blinking animation
// setInterval(blink, 500);
// function blink() {
//   let opacity = paragraph.style[`opacity`];
//   if (opacity === `1`) {
//     paragraph.style[`opacity`] = `0`;
//   } else {
//     paragraph.style[`opacity`] = `1`;
//   }
// }

// fade out animation
// fadeOut();
// function fadeOut() {
//   opacity -= 0.01;
//   paragraph.style[`opacity`] = opacity;
//   if (opacity > 0) {
//     requestAnimationFrame(fadeOut);
//   }
// }

// // click event
// paragraph.addEventListener(`click`, function (event) {
//   event.target.innerText = `${event.clientX}, ${event.clientY}`;
// });
//
// // change color on click
// let mainHeading = document.getElementById(`main-heading`);
// let subHeading = document.getElementById(`sub-heading`);
//
// mainHeading.addEventListener(`click`, setRedTextColor);
// subHeading.addEventListener(`click`, setRedTextColor);
//
// function setRedTextColor() {
//   event.target.style[`color`] = `red`;
// }
let originalText = paragraph.innerText;

document.addEventListener(`keydown`, function(event) {
  if(event.keyCode === 32){
  paragraph.style[`color`] = `#ff0000`;
}
});
