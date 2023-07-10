import fs from "fs";
import cstack from "../../src/index";

console.debug(cstack, "\n");

const codePath = "check/cstack.check.code";

const code = fs.readFileSync(codePath, "utf-8");

eval(code);
