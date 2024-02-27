const fs = require('fs/promises');

module.exports = async function(output, outputFile) {
  //console.error(`outputFile = ${outputFile}`)
  if (outputFile === undefined) {
    console.log(output);
    return;
  }
  await fs.writeFile(outputFile, output)
  await fs.chmod(outputFile, 0o755);
}