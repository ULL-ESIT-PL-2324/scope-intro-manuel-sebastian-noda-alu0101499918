const { $, dast2json } = require('./utils.js')
const deb = require('./deb.js');

const {
  buildIdentifier,
  buildVariableDeclaration,
  buildVariableDeclarator,
} = require('./ast-build');

const astTypes = require("ast-types");

const Support = require("./support-lib.js");
// Build regexp matching the names of the support functions /factorial|power|min|max|.../
let functionNames = Object.keys(Support).map(n => n.replace(/[$*.^]/, '[$&]')) // Escape regexp special characters
const patternIsSupport = new RegExp(functionNames.join('|'));

// Detect what support functions are used: dependency analysis
function dependencies(dAst) {
    const functionNames = Object.keys(require("./support-lib.js"));
    
}

// Builds the set of variables that are initialized in the program
const initializedVariables = (dAst) => {
  /* fill the code here */
};

// Detects which variables are used in the program
const usedVariables = (dAst) => {
  /* fill the code here */
};

module.exports = {
  initializedVariables,
  dependencies,
  usedVariables,
}