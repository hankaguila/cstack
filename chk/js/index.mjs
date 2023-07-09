import fs from "fs";
import cstack from "../../dist/index.mjs";

console.debug(cstack, "\n");

const codePath = "chk/code";

const code = fs.readFileSync(codePath, "utf-8");

eval(code);
