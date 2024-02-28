#!/usr/bin/env node
const {print, factorial, Complex } = require("/home/usuario/practicas/practica_4/scope-intro-manuel-sebastian-noda-alu0101499918/src/support-lib.js");
print(
    factorial(Complex("2")).pow(factorial(Complex("3")).pow(factorial(Complex("2"))))
);