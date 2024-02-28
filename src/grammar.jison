%{
const { 
  buildRoot, 
  buildBinaryExpression, 
  buildLiteral, 
  buildCallExpression, 
  buildIdentifier,
  buildAssignmentExpression,
  buildSequenceExpression,
  buildCallMemberExpression,
  buildMax,
  buildMin,
} = require('./ast-build');
const {$} = require('./utils.js')
%}

/* add remaining precedences */
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