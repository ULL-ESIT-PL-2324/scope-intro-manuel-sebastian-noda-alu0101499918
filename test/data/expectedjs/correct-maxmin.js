#!/usr/bin/env node
const {max, Complex, min, print } = require("/home/usuario/practicas/practica_4/scope-intro-manuel-sebastian-noda-alu0101499918/src/support-lib.js");
let $a;

$a = max(
    Complex("2").add(Complex("4")),
    min(Complex("3"), Complex("5").sub(Complex("i")))
), print($a);