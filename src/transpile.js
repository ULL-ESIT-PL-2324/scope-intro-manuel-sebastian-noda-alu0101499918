#!/usr/bin/env node
const {deb} = require('./deb.js');
const { difference, notDeclared } = require('./utils.js');
const p = require("./calc").parser;
const fs = require('fs/promises');
const { dependencies, scopeAnalysis} = require('./scope.js');
const codeGen = require('./code-generation.js')
const writeCode = require('./write-code.js');

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

