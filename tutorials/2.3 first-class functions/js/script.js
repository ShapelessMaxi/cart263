"use strict";

// normal way of defining function
function add(a, b) {
  return a + b;
}

// assinging the function to a variable
let addingFunction = add;
let result = addingFunction(17, 5);
// alert(`the result is ${result}!!!!!!!!!`);

//'anonymous function'
let bonjour = function () {
  alert(`hola`);
};
// setTimeout(bonjour, 4000);

// anonymous function inside called function
setTimeout(function () {
  alert(`bingboing`);
}, 2000);
