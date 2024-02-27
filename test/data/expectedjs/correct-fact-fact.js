#!/usr/bin/env node
const $factorial = n => (n === 0) ? 1 : n * $factorial(n - 1);
$factorial(2) * $factorial(3);