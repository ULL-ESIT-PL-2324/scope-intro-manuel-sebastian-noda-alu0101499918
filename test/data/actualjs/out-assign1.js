#!/usr/bin/env node
const {Complex, print } = require("/home/usuario/practicas/practica_4/scope-intro-manuel-sebastian-noda-alu0101499918/src/support-lib.js");
let $a, $b;
($a = Complex("4").add(Complex("2")), $b = Complex("5").mul($a)), print($b);