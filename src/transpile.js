#!/usr/bin/env node
const {deb} = require('./deb.js');
const { difference, notDeclared } = require('./utils.js');
const p = require("./calc").parser;
const fs = require('fs/promises');
const { dependencies, scopeAnalysis} = require('./scope.js');
const codeGen = require('./code-generation.js')
const writeCode = require('./write-code.js');

/**
 * @module transpile
 * @description Este módulo proporciona una función asincrónica para transpilar código de entrada a un nuevo archivo de salida.
 * @param {string} inputFile - La ruta del archivo de entrada.
 * @param {string} outputFile - La ruta del archivo de salida.
 * @returns {Promise<string>} - Una promesa que se resuelve con el código transpilado si tiene éxito, o se rechaza con un mensaje de error si falla.
 */

module.exports = async function transpile(inputFile, outputFile) {
  let input = await fs.readFile(inputFile, 'utf-8')
  let ast;
  try {
    ast = p.parse(input);
  } catch (e) {
    let m = e.message
    console.error(m);
    return m;

  }
  //console.log(JSON.stringify(ast, null, 2))
  //process.exit(0);
  
  ast = dependencies(ast);
  ast = scopeAnalysis(ast);

  let output = codeGen(ast);
  
  debugger;
  await writeCode(output, outputFile);
  return output;
}

