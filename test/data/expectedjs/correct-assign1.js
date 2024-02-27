#!/usr/bin/env node
const Complex = require("/Users/casianorodriguezleon/campus-virtual/2223/pl2223/practicas/drafts/scope-intro-solution/src/complex.js");  
const print = x => { console.log(x); return x; };
let $a, $b;
($a = Complex("4").add(Complex("2")), $b = Complex("5").mul($a)), print($b);