const {$} = require('./utils.js')

function buildRoot(child) {
  return{
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: child,

      },
    ],
    sourceType: "script",
  };
}

function buildLiteral(value) {
 return{
  type: "Literal",
  value: String(value),
  raw: `"${value}"`,
 };
}


function buildBinaryExpression(left, op, right) {
  return {
    type: "BinaryExpression",
    left: left,
    operator: op,
    right: right,
  };
}

function buildCallExpression(functionName, arguments, reservedWord = false) {
  return {
      "type": "CallExpression",
      "callee": {
        "type": "Identifier",
        "name": reservedWord? functionName : $(functionName)
      },
      "arguments": arguments
  }
}

function buildUnaryExpression(op, argument, prefix) {
  return {
    type: "UnaryExpression",
    operator: op,
    argument: argument,
    prefix: prefix,
  };
}

function buildIdentifier(name) {
  return {
    type: "Identifier",
    name: name,
  };
}

function buildVariableDeclaration(declarations) {
  return {
    type: "VariableDeclaration",
    declarations: declarations,
    kind: "let",
  };
}

function buildVariableDeclarator(id) {
  return {
    type: "VariableDeclarator",
    id: id,
    init: null,
  };
}

function buildAssignmentExpression(name, operator, right) {
  return {
    type: "AssignmentExpression",
    operator,
    left: buildIdentifier(name),
    right: right,
  };
}

function buildSequenceExpression(expressions) {
  return {
    type: "SequenceExpression",
    expressions: expressions,
  };
}

function buildUnaryExpression(operator, child, prefix = true) {
  return {
    type: "UnaryExpression",
    operator,
    argument: child,
    prefix
  };
}

function buildCallMemberExpression(caller, names, args) {
  let namesList = names.split('.');
  return {
    type: "CallExpression",
    callee: buildMemberExpression(caller, namesList),
    arguments: args,
  };
}

function buildMemberExpression(caller, names) {
  if (names.length === 1) {
    return {
      type: "MemberExpression",
      property: {
        type: "Identifier",
        name: names.pop()
      },
      object: caller
    };
  }
  return {
    type: "MemberExpression",
    property: {
      type: "Identifier",
      name: names.pop()
    },
    object: buildMemberExpression(caller, names),
  };
}

function buildMin(left, right, reservedWord = false) {
  return buildCallExpression('min', [left, right], reservedWord);
}

function buildMax(left, right, reservedWord = false) {
  return buildCallExpression('max', [left, right], reservedWord);
}

module.exports = {
  buildRoot,
  buildBinaryExpression,
  buildLiteral,
  buildCallExpression,
  buildUnaryExpression,
  buildIdentifier,
  buildVariableDeclaration,
  buildVariableDeclarator,
  buildAssignmentExpression,
  buildSequenceExpression,
  buildMax,
  buildMin,
  buildCallMemberExpression,
}