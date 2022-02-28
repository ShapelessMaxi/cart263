// setup();
//
// function setup() {
//   console.log(document);
// }

let mainHeading = document.getElementById(`main-heading`);
mainHeading.style.color = `#339944`;
mainHeading.style[`font-size`] = `4rem`;

mainHeading.innerHTML = `<strong>BIGN BONG</strong>`;

let pronoun = document.getElementById(`pronoun`);
if (pronoun.innerText === `we`) {
  pronoun.innerText = `you`;
}

let image = document.getElementById(`clown-image`);
image.setAttribute(`src`, `http://loremflickr.com/320/240/clown`);

// let headers = document.getElementsByClassName(`header`);
// for (let i = 0; i < headers.length; i++) {
//   headers[i].style[`color`] = `red`;
// }

let headers = document.querySelectorAll(`.header`);
for (let i = 0; i < headers.length; i++) {
  headers[i].style[`color`] = `red`;
}

let titles = document.getElementsByTagName(`h2`);
for (let i = 0; i < titles.length; i++) {
  titles[i].style[`color`] = `blue`;
}

let newP = document.createElement(`p`);
newP.innerText = `i rly love clowns`;

let clownSection = document.getElementById(`clown-section`);
clownSection.appendChild(newP);

mainHeading.parentElement.removeChild(mainHeading);
