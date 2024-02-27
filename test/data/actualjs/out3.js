#!/usr/bin/env node
const Complex = require("/Users/casiano/campus-virtual/2223/pl2223/practicas/scope-intro/scope-intro-solution/src/complex.js");  
const print = x => { console.log(x); return x; };
let $a;
$a = Complex("2").mul(Complex("5")).sub(Complex("2").pow(Complex("3"))), print($a);