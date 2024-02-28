%{
const reservedWords = ["print","i"]  

const idOrReserved = text => {
  if(reservedWords.find( w => w == text)) return 'PID';
  return 'ID';
 }
%}
number (\d+(\.?\d+)?([eE][-+]?\d+)?"i"?)|"i"

%%
\s+                      ;
"#".*                    ;
\/\*(.|\n)*?\*\/         ;
{number}       return 'N';
[a-zA-Z_]\w*   return idOrReserved(yytext); 
'**'           return '**';
[-=+*/!(),@&]  return yytext;
