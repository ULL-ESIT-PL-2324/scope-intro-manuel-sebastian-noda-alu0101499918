#!/usr/bin/env node
import description from "../test-description.mjs";
import * as fs from "fs";

const suffix = process.argv[2];
const hasErrors = process.argv[3] || false;

if (suffix === undefined) {
  console.log("Usage: push-description.mjs <suffix>");
  process.exit(1);
}

// Bug to fix. Check if the suffix is already in the description and remove it if so!!!
let exists = description.findIndex(t => t.input === `test${suffix}.calc`);
if (exists !== -1) {
  console.log(`Suffix test${suffix}.calc already exists in the description`);
  description.splice(exists, 1);
}
if (hasErrors) {
  description.push({
    input: `test${suffix}.calc`,
    actualjs: `out${suffix}.js`,
    expectedjs: `correct${suffix}.js`,
  });
}
else {
  description.push({
    input: `test${suffix}.calc`,
    actualjs: `out${suffix}.js`,
    expectedjs: `correct${suffix}.js`,
    expectedout: `correct-out${suffix}.txt`
  });  
}

let template = `
export default ${JSON.stringify(description, null, 2)};
`
//console.log(template);

fs.writeFileSync("test/test-description.mjs", template);