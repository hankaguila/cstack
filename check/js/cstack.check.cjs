const fs = require("fs");
const cstack = require("../../build/index.cjs");

console.debug(cstack, "\n");

const codePath = "check/cstack.check.code";

const code = fs.readFileSync(codePath, "utf-8");

eval(code);
