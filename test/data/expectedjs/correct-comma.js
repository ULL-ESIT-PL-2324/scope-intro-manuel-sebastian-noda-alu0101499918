#!/usr/bin/env node
const $Complex = require("/Users/casianorodriguezleon/campus-virtual/2223/pl2223/practicas/drafts/calc2js-solution/src/complex.js");  
const $print = x => { console.log(x); return x; };
const $factorial = function(num) {
  if (num.im !== 0) throw new Error(`Imaginary part must be zero. Instead is ${num.im}`);
  let n = num.re;
  if (!Number.isInteger(n)) throw new Error(`Not an Integer number ${n}`);
  if ( n < 0) throw new Error(`Factorial of negative number ${n}`);
  let result = $Complex(1);
  if (n === 0) return result;
  for (let i = 1; i <= n; i++) {
    result = result.mul(i);
  }
  return $Complex({re: result.re, im: num.im});
};
($Complex('2'), $Complex('3').pow($Complex('2'))), $print($factorial($Complex('4')));