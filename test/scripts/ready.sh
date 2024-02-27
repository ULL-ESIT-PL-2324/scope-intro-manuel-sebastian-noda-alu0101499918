#!/bin/bash
cat test/data/input/test"$1".calc
if bin/calc2js.mjs test/data/input/test"$1".calc -o test/data/expectedjs/correct"$1".js; then
    node test/data/expectedjs/correct"$1".js > test/data/expectedout/correct-out"$1".txt
    node test/scripts/push-description.mjs $1
    #npx mocha --grep "test$1\\.calc" test/test.mjs
else
  echo "input has errors"
  bin/calc2js.mjs test/data/input/test"$1".calc 2> test/data/expectedjs/correct"$1".js
  node test/scripts/push-description.mjs $1 hasErrors
fi 