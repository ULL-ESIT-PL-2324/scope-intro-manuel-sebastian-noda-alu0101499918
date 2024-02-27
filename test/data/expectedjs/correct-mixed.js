#!/usr/bin/env node
const Complex = require("/Users/casianorodriguezleon/campus-virtual/2223/pl2223/practicas/drafts/scope-intro-solution/src/complex.js");  
const print = x => { console.log(x); return x; };
print(Complex("1").neg().pow(Complex("0.5")));