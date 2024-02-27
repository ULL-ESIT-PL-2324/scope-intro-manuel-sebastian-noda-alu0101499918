%{
const reservedWords = ["print","i"]  

const idOrReserved = text => {/* fill the code */  }
%}
number /* fill the code */

%%
\s+            /* skip whites */;
{number}       return 'N';
[a-zA-Z_]\w*   return /* fill the code */; 
'**'           return '**';
[-=+*/!(),@&]  return yytext;
