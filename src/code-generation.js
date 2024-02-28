const recast = require("recast");
const path = require('path');

let template = (dependencies, fullPath) =>
`#!/usr/bin/env node
const {${dependencies} } = require("${fullPath}");
`;

module.exports = function codeGen(ast) {
  let fullPath = path.join(__dirname, 'support-lib.js');
  let dependencies = Array.from(ast.dependencies).join(", ");
  let preamble = template(dependencies, fullPath);
  let output = preamble+recast.print(ast.ast).code;
  return output;  
}
