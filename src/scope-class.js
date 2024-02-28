const {
  buildIdentifier,
  buildVariableDeclaration,
  buildVariableDeclarator,
} = require('./ast-build');

const { difference } = require('./utils.js');

class Scope {
constructor(parent) {
  this.parent = parent;
  this.initialized = new Set();
  this.used = new Set();
  this.letDeclarations = [];
}

add(name) {
  this.initialized.add(name);
  this.letDeclarations.push(buildVariableDeclarator(buildIdentifier(name)));
}

setAsIninitalized(name) {
  this.initialized.add(name);
}

setAsUsed(name) {
  this.used.add(name);
}

has(name) {
  return this.initialized.has(name);
}

buildDeclaration() {
  return buildVariableDeclaration(this.letDeclarations);
}

notDeclared() {
  return difference(this.used, this.initialized)
}

notDeclaredMessage() {
  let d = this.notDeclared();
  if (d.size > 0) {
    return Array.from(d).
      map(x => x.replace(/^[$]/, '')).
      map(x => `Not declared variable '${x}'`).join('\n')
  }
  return null;
}

get length() {
  return this.letDeclarations.length;
}
};

module.exports = Scope;