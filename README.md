[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=14053521)
# Lab Introduction to Scope Analysis

Véase el lab [scope-intro](https://ull-pl.vercel.app/labs/scope-intro)


# Author : Manuel José Sebastián Noda

# Opciones en línea de comandos (-o, -V, -h, etc.)

  Ya teniamos incluidos las opciones de -o y -V, por lo que lo unico que teniamos que hacer era añadir la opcion -h,
  de la misma manera qeu la opcion -o

  program
  .version(version)

  .argument("<filename>", 'file with the original code')

  .option("-o, --output <filename>", "file in which to write the output")

  .option('-h, --help   ','display help for command')

  .action((filename, options) => {

    transpile(filename, options.output);

  });

# Traduce correctamente las expresiones fuente a JS

 Aqui tenemos un ejemplo de como nos muestra el codigo a js del test assing-1.
 
 let $a, $b;

($a = Complex("4").add(Complex("2")), $b = Complex("5").mul($a)), print($b);

# Refleja la asociatividad y prioridad de operaciones correcta
   Aqui tenemos la gramatica ustilizada para definir la prioridad de los operandos, para evitar ambiguedades y como se 
  "construllen" las operaciones.

```jison

%left ','
%right '='
%left '@'
%left '&'
%left '-' '+'
%left '*' '/'
%nonassoc UMINUS
%right '**'
%left '!'
%%
es: e { return { ast: buildRoot($e) }; }
;

e: 
 
   e ',' e              { $$ = buildSequenceExpression([$e1, $e2]); }
  | ID '=' e            { $$ = buildAssignmentExpression($($ID),'=',$e); }
  | e '@' e             { $$ = buildMax($e1, $e2, true); }
  | e '&' e             { $$ = buildMin($e1, $e2, true); }

  | e '-' e             { $$ = buildCallMemberExpression($e1, 'sub', [$e2]); }
  | e '+' e             { $$ = buildCallMemberExpression($e1, 'add', [$e2]); }
  | e '*' e             { $$ = buildCallMemberExpression($e1, 'mul', [$e2]); }
  | e '/' e             { $$ = buildCallMemberExpression($e1, 'div', [$e2]); }
  | e '**' e            { $$ = buildCallMemberExpression($e1, 'pow', [$e2]); }
  | '(' e ')'           { $$ = $2; }
  | '-' e %prec UMINUS  { $$ = buildCallMemberExpression($e, 'neg', []); }
  | e '!'               { $$ = buildCallExpression('factorial', [$e], true); }
  |PID '(' e ')'        { $$ = buildCallExpression($PID, [$e], true);}
  | ID                  { $$ = buildIdentifier($($ID)); }
  | N                   { $$ = buildCallExpression('Complex',[buildLiteral($N)], true); }
  
;

```

# Se declaran las variables inicializadas en el preámbulo del programa JS

  En la linea 12 podemos ver como inicalizmaos las variables , en el fichero code-generation.js

  ```js

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

```

# Da mensajes de error para variables no declaradas
  Aqui podemos ver como por ejemplo en el test-scope1 no tenemos decalarado d y c.

    a = 4+d+i, 
    b = 2-2i, 
    print(c)

  Y detecta que las variables d y c no estan declaradas y nos da un mensaje de error

  Not declared variable 'd'
  Not declared variable 'c'

# Maneja números complejos: i, i**2, 2-i**3, etc.

 Aqui tenemos un ejemplo de como tratamos los numeros complejos

#!/usr/bin/env node
const {Complex, print } = require("/home/usuario/practicas/practica_4/scope-intro-manuel-sebastian-noda-alu0101499918/src/support-lib.js");
let $a, $b;
($a = Complex("4").add($d).add(Complex("i")), $b = Complex("2").sub(Complex("2i"))), print($c);
  
# El package.json tiene scripts para ejecutar el programa

  "dependencies": {

    "ast-types": "^0.14.2",

    "chmod": "^0.2.1",

    "comander": "^0.0.1-security",

    "commander": "^10.0.1",

    "complex.js": "^2.1.1",

    "jison": "^0.4.18",

    "nyc": "^15.1.0",

    "recast": "^0.22.0",

    "set-operations": "^2.0.2",

    "shelljs.exec": "^1.1.8"

  },

# Ha añadido tests suficientes

  ✔ transpile(test-scope1.calc, out-scope1.js) (No errors: false)

  ✔ transpile(test1.calc, out1.js) (No errors: true) (88ms)

  ✔ transpile(test2.calc, out2.js) (No errors: true) (69ms)

  ✔ transpile(test-scope2.calc, out-scope2.js) (No errors: true) (70ms)

  ✔ transpile(test-power-power.calc, out-power-power.js) (No errors: true) (72ms)

  ✔ transpile(test-print.calc, out-print.js) (No errors: true) (80ms)

  ✔ transpile(test-assign1.calc, out-assign1.js) (No errors: true) (73ms)

  ✔ transpile(test-maxmin.calc, out-maxmin.js) (No errors: true) (73ms)

  ✔ transpile(test4.calc, out4.js) (No errors: true) (55ms)

  ✔ transpile(test-mixed.calc, out-mixed.js) (No errors: true) (71ms)

  ✔ transpile(test-exp.calc, out-exp.js) (No errors: true) (73ms)

  ✔ transpile(test-exp-fact.calc, out-exp-fact.js) (No errors: true) (74ms)

  ✔ transpile(test3.calc, out3.js) (No errors: true) (70ms)

  ✔ transpile(test-id.calc, out-id.js) (No errors: true) (74ms)

  ✔ transpile(test-fact-fact.calc, out-fact-fact.js) (No errors: true) (56ms)
  
  ✔ transpile(test-comma.calc, out-comma.js) (No errors: true) (73ms)

  16 passing (1s)