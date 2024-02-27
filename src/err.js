module.exports = function errorMsg({rule, token, first_line, first_column, last_line, last_column}) {
  
  let upto = token.indexOf('\n')
  if (upto == -1) upto = token.length;
  let prefix = token.slice(0, upto);

  console.error(
    `Unexpected "${prefix}" at line ${first_line} column ${first_column} of input: "${errorMsg.input}"`);
  if (rule) console.error(`Rule: ${rule}`);
  process.exit(1);
}