const fs = require("fs");
const cstack = require("../../src/index");

console.debug(cstack, "\n");

const codePath = "chk/code";

const code = fs.readFileSync(codePath, "utf-8");

eval(code);
