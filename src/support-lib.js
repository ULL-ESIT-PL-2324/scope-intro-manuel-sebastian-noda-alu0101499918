const Complex = require('complex.js')

/**
 * Calcula el factorial de un número entero.
 * @param {Complex} num - El número para calcular el factorial.
 * @throws {Error} - Error si el número tiene parte imaginaria distinta de cero, no es un entero o es negativo.
 * @returns {Complex} - El resultado del factorial.
 */

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

/**
 * Obtiene el máximo entre dos números complejos.
 * @param {Complex} a - El primer número complejo.
 * @param {Complex} b - El segundo número complejo.
 * @returns {Complex} - El número complejo máximo.
 */

const max = function(a, b) {
  if (a.re > b.re) return a;
  if (a.re < b.re) return b;
  // If we reached here is a.re === b.re
  if (a.im > b.im) return a;
  if (a.im < b.im) return b;
  return a;
}
/**
 * Obtiene el mínimo entre dos números complejos.
 * @param {Complex} a - El primer número complejo.
 * @param {Complex} b - El segundo número complejo.
 * @returns {Complex} - El número complejo mínimo.
 */
const min = function(a, b) {
  if (a.re < b.re) return a;
  if (a.re > b.re) return b;
  // If we reached here is a.re === b.re
  if (a.im < b.im) return a;
  if (a.im > b.im) return b;
  return a;
}
/**
 * Imprime un valor y lo devuelve.
 * @param {*} x - El valor a imprimir.
 * @returns {*} - El valor que se imprimió.
 */
const print = x => { console.log(x); return x; } 

module.exports = {
  print,
  factorial,
  max,
  min,
  Complex
};