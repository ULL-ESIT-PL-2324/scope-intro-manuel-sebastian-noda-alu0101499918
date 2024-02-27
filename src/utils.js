const $ = id => '$' + id;

const dast2json =  (dAst) => {
  let jsonDAst = dAst;
  jsonDAst.dependencies = Array.from(dAst.dependencies);
  jsonDAst.symbolTable = Array.from(dAst.symbolTable);
  jsonDAst.used = Array.from(dAst.used);

  return jsonDAst;
}

function difference(setA, setB) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

function notDeclared(someVars) {
  return Array.from(someVars).
         map(x => x.replace(/^[$]/, '')).
         map(x => `Not declared variable '${x}'\n`)
}

module.exports = {
  $, 
  dast2json,
  difference,
  notDeclared
};