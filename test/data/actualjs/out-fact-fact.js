#!/usr/bin/env node
const $factorial = n => (n === 0) ? 1 : n * $factorial(n - 1);
const $power = Math.pow;
const $print = x => { console.log(x); return x; };
$factorial(2) * $factorial(3);