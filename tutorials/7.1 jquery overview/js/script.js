"use strict";

// select the main heading with jQuery
let $mainHeading = $(`#main-heading`);
// use the css method to access the style of the element
$mainHeading.css(`color`, `#339966`);

// select the sub headers, and access their style
$(`.header`).css(`color`, `#339966`);

// select the headers
let $headers = $(`.header`);
// acces their style (more efficient than asking jquery to find the headers everytime)
$headers.css(`background-color`, `black`);
$headers.css(`text-size`, 20);

// change multiple css properties using an object
$headers.css({
  "color": `blue`,
  "background-color": `orange`,
  "font-size": `5rem`,
});

// select the span text, and change it
$(`#example-span`).text(`bing bong`);

// select the span text html, and add a strong tag to it
let $spanHTML = $(`#example-span`).html();
$(`#example-span`).html(`<strong>${$spanHTML}</strong>`);

// set the editable content attribute of the main heading to true
$mainHeading.attr(`contenteditable`,`true`);

// check what the link is
let $link = $(`#thicc-link`);
if($link.attr(`href`) === `https://thi.cc`){
  $link.text(`THICC`);
}

// create an element
let $p = $(`<p></p>`);
$p.text(`fresh paragraph`);

// add it to the page (.append, .prepend, .after, .before)
$(`h2`).after($p);

// remove the main heading
$mainHeading.remove();
