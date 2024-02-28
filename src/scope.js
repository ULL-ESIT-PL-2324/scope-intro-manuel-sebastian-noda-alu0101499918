/**
 * @module analysis
 * @description Este módulo proporciona funciones para el análisis de dependencias
 *   y análisis de alcance en código JavaScript.
 */

const { $, dast2json } = require('./utils.js')
const deb = require('./deb.js');

const {
  buildIdentifier,
  buildVariableDeclaration,
  buildVariableDeclarator,
} = require('./ast-build');

const astTypes = require("ast-types");
const visit = astTypes.visit;

/**
 * Detecta qué funciones de soporte se utilizan mediante análisis de dependencias.
 * @param {Object} dAst - El árbol sintáctico dinámico del código.
 * @returns {Object} - El árbol sintáctico dinámico con información de dependencias actualizada.
 */
// Detect what support functions are used: dependency analysis
function dependencies(dAst) {
    const functionNames = Object.keys(require("./support-lib.js"));

    dAst.dependencies = new Set([]);
    visit(dAst.ast,{
      visitCallExpression(path) {
        const node = path.node;
        let name = node.callee.name;
        if(functionNames.includes(name)){
          dAst.dependencies.add(name);
        }
        this.traverse(path);
      }
    });
    return dAst;
}

/**
 * Realiza un análisis de alcance en el código para detectar variables no declaradas y agregar declaraciones de variable necesarias.
 * @param {Object} dAst - El árbol sintáctico dinámico del código.
 * @returns {Object} - El árbol sintáctico dinámico con información de alcance actualizada.
 */

const scopeAnalysis = (dAst) => {
  const Scope = require('./scope-class.js');
  let scope = new Scope(null);
  let ast = dAst.ast;

  visit(ast,{
    visitFunctionExpression(path) {
      let node = path.node;
      scope = new Scope(scope);

      let params = node.params;
      for(let param of params) {
        scope.setAsInitialized(param.name);
      }
      this.traverse(path);
      if(scope.length > 0) {
        node.body.body.unshift(scope.buildVariableDeclaration());
      }
      node.scope = scope;
      let d = scope.notDeclareMessage();
      if(d) console.error(d + 'used in function scope');

      scope = scope.parent;
    },
    visitAssignmentExpression(path) {
      const node = path.node;
      if(node.left.type === "Identifier") {
        let name = node.left.name;
        if(name && !scope.has(name)) {
          if(!dAst.dependencies.has(name)){
            scope.add(name);
          }
        }
      }
      this.traverse(path);
    },
    visitIdentifier(path) {
      let name = path.node.name;
      if(/^[$]/.test(name) && !dAst.dependencies.has(name)) {
        scope.setAsUsed(name);
      }

      this.traverse(path);
    }
  });

  if(scope.length > 0){
    ast.body.unshift(scope.buildDeclaration());
  }

  ast.scope = scope;

  let d = scope.notDeclaredMessage();
  if(d)  console.error(d)

  return dAst;
};

module.exports = {
  dependencies,
  scopeAnalysis 
}