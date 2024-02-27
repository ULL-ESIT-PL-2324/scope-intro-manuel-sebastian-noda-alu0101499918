#!/usr/bin/env node
const Complex = require("/Users/casiano/campus-virtual/2223/pl2223/practicas/scope-intro/scope-intro-solution/src/complex.js");  
const print = x => { console.log(x); return x; };
let $a, $b;
($a = Complex("4").add(Complex("i")), $b = Complex("2").sub(Complex("2i"))), print($a.mul($b));