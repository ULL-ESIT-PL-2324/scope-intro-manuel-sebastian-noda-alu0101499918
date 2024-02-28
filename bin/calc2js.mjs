#!/usr/bin/env node
import { program } from "commander";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { version } = require("../package.json");
import transpile from "../src/transpile.js";
/**
 * @description Define y configura la interfaz de línea de comandos para la transpilación de archivos.
 * @param {string} "<filename>" - El nombre del archivo de entrada con el código original.
 * @param {Object} options - Opciones para la transpilación.
 * @param {string} options.output - El nombre del archivo en el que se escribirá la salida transpilada.
 */
program
  .version(version)
  .argument("<filename>", 'file with the original code')
  .option("-o, --output <filename>", "file in which to write the output")
  .option('-h, --help   ','display help for command')
  .action((filename, options) => {
    transpile(filename, options.output);
  });

program.parse(process.argv);
