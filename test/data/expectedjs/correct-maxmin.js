#!/usr/bin/env node
const Complex = require("/Users/casianorodriguezleon/campus-virtual/2223/pl2223/practicas/drafts/scope-intro-solution/src/complex.js");  
const max = function(a, b) {
  if (a.re > b.re) return a;
  if (a.re < b.re) return b;
  // If we reached here is a.re === b.re
  if (a.im > b.im) return a;
  if (a.im < b.im) return b;
  return a;
};
const min = function(a, b) {
  if (a.re < b.re) return a;
  if (a.re > b.re) return b;
  // If we reached here is a.re === b.re
  if (a.im < b.im) return a;
  if (a.im > b.im) return b;
  return a;
};
const print = x => { console.log(x); return x; };
let $a;

$a = max(
    Complex("2").add(Complex("4")),
    min(Complex("3"), Complex("5").sub(Complex("i")))
), print($a);