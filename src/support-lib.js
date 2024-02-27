const Complex = require('complex.js')

const factorial = function(num) {
  if (num.im !== 0) throw new Error(`Imaginary part must be zero. Instead is ${num.im}`);
  let n = num.re;
  if (!Number.isInteger(n)) throw new Error(`Not an Integer number ${n}`);
  if ( n < 0) throw new Error(`Factorial of negative number ${n}`);
  let result = Complex(1);
  if (n === 0) return result;
  for (let i = 1; i <= n; i++) {
    result = result.mul(i);
  }
  return Complex({re: result.re, im: num.im});
};

const max = function(a, b) {
  if (a.re > b.re) return a;
  if (a.re < b.re) return b;
  // If we reached here is a.re === b.re
  if (a.im > b.im) return a;
  if (a.im < b.im) return b;
  return a;
}

const min = function(a, b) {
  if (a.re < b.re) return a;
  if (a.re > b.re) return b;
  // If we reached here is a.re === b.re
  if (a.im < b.im) return a;
  if (a.im > b.im) return b;
  return a;
}

const print = x => { console.log(x); return x; } 

module.exports = {
  print,
  factorial,
  max,
  min
};